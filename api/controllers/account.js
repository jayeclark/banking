import CheckingAccount from "../models/CheckingAccount.js";
import SavingsAccount from "../models/SavingsAccount.js";
import InstallmentLoanAccount from "../models/InstallmentLoanAccount.js";
import db from "../database.js";
import { decodeAccessToken } from "../services/helpers/auth.js";
import { findDoc as findUser } from "../services/user.js";
import { findDoc as findCustomer } from "../services/customer.js";
import { findDoc } from "../services/account.js";

const accountCollection = db.collections.account;

async function create(request, response) {
  
  // Reject non-authenticated requests
  const auth_token = request.headers.authorization.split(" ")[1];
  if (!isAuthenticated(auth_token)) {
    response.status(500).json({ error: { type: "auth", message: "Authentication error.", data: e } })
    return;
  }

  // Create account object
  const options = request.body;
  let account;
  switch (options.type) {
    case "checking":
      account = new CheckingAccount(options);
      break;
    case "savings":
      account = new SavingsAccount(options);
      break;
    case "installmentLoan":
      account = new InstallmentLoanAccount(options);
      break;
    default:
      account = new CheckingAccount(options); 
  }

  // Throw an error if the data provided was not correct/complete
  if (!account.isValid()) {
    response.status(400).json({ error: { type: "missingData", message: "Unable to register user. Required information is missing.", data: account.missingAccountData() } })
    return;    
  }

  // Make sure all authedUsers are actually associated with the customer and have at least one permission, and that one user has manage permission
  const { authedUsers } = account;
  let managePermissionExists = false;
  const validAuthedUsers = authedUsers.map((u) => {
    const { data: thisUser } = await findUser({ _id: u._id });
    if (thisUser.customerID !== account.customerID) {
      return null
    }
    if (u.permissions.length == 0) {
      u.permissions.push("read");
    } else if (u.permissions.includes("manage")) {
      managePermissionExists = true;
    }
    return u;
  }).filter(x => x !== null);
  if (validAuthedUsers.length == 0) {
    response.status(400).json({ error: { type: "request", message: "Invalid request. No valid authed users for account." } });
    return;
  }
  if (managePermissionExists == false) {
    validAuthedUsers[0].permissions.push("manage");
  }

  // Check if the requesting user can create the account
  let validRequest = false;
  let customerID = account.customerID;
  let { id: requesterID } = decodeAccessToken(auth_token);
  const { data: requestingUser } = await findUser({ id: requesterID });
  
  // An existing user who is an admin for a customer may create an account for that customer
  // However, they must be listed among the authed users
  const userAuth = account.authedUsers.filter(x => x.user._id === requestingUser._id)
  if (requestingUser.admin && requestingUser.customerID == customerID) {
    if (userAuth.length == 0) {
      account.authedUsers.push({ user: { _id: requestingUser._id, username: requestingUser.username }, permissions: ["read", "write", "manage"] });
    } else {
      const idx = account.authedUsers.findIndex(x => x.user._id == requestingUser._id);
      account.authedUsers[idx].permissions = ["read", "write", "manage"];
    }
    validRequest = true;
  }

  // An existing user who is a superadmin may create an account for any customer
  if (requestingUser.superadmin) {
    validRequest = true;
  }

  // Return error is request is invalid
  if (!validRequest) {
    response.status(500).json({ error: { type: "auth", message: "User is not authorized to create an account." } });
    return;
  }

  // Create account
  let createdAccount;
  try {
    createdAccount = await accountCollection.insertOne(account)
  } catch (e) {
    response.status(500).json({ error: { type: "unknown", message: e } });
    return;
  }

  // Send account as response
  response.status(200).kson({ ...createdAccount, account });
}

async function read(request, response) {
  // Reject non-authenticated requests
  const auth_token = request.headers.authorization.split(" ")[1];
  if (!isAuthenticated(auth_token)) {
    response.status(500).json({ error: { type: "auth", message: "Authentication error.", data: e } })
    return;
  }

  // Retrieve acccount info from database
  let accountData;
  try {
    const query = request.query;
    accountData = await findDoc(query);
  } catch (e) {
    response.status(500).json({ error: { type: "db", message: "Database error.", data: e } })
    return;
  }

  // Send response early if not successful 
  if (accountData.code !== 200) {
      response.status(accountData.code).json(accountData.data);
  }

  // Do not send response if user does not have permission to access the info
  let { id: requesterID } = decodeAccessToken(auth_token);
  const { data: requestingUser } = await findDoc({ id: requesterID });
  console.log(requestingUser);

  // Request is invalid if the user does not have permission to access the account or is not associated with the account's customer
  const authedUsers = accountData.data.authedUsers.filter(x => x.user._id == requestingUser._id);
  if (authedUsers.length == 0 || requestingUser.customerID == accountData.data.customerID) {
        response.status(500).json({ error: { type: "auth", message: "User is not authorized to access that content." } });
    return;
  }

  // Remove authed user data from account as it contains private keys
  delete accountData.data.authedUsers;
  response.status(accountData.code).json(accountData.data);
  return;
}

async function update(request, response) {
  
}

async function del(request, response) {
  
}

const controller = { create, read, update, del };
export default controller;