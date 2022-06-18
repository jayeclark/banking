import CheckingAccount from "../models/Account/CheckingAccount.js";
import SavingsAccount from "../models/Account/SavingsAccount.js";
import InstallmentLoanAccount from "../models/Account/InstallmentLoanAccount.js";
import db from "../database.js";
import { authenticate, ownsCustomer, isAccountSuperadmin, ownsAccountCustomer, isCustomerSuperadmin } from "../services/helpers/auth.js";
import { findDoc as findCustomer } from "../services/customer.js";
import { findDoc, updateDoc, deleteDoc, checkPermissions } from "../services/account.js";
import { checkPermissions as checkCustomerPermissions } from "../services/customer.js";
import APIError from "../services/helpers/error.js";

const accountCollection = db.collections.account;

async function create(request, response) {
  // Reject non-authenticated requests
  const auth_token = request.headers.authorization?.split(" ")[1];
  const { userIsAuthenticated, user: requestingUser } = await authenticate(auth_token);
  if (!userIsAuthenticated) {
    APIError.authentication(response);
    return;
  }

  // Reject un-authorizeed requests
  const config = [ownsCustomer, isCustomerSuperadmin];

  if (request.body.customerID == null) {
    APIError.authentication(response);
    return;
  }
  const requestedCustomer = (await findCustomer({ id: request.body.customerID })).data;

  if (requestedCustomer == null) {
    APIError.authorization(response);
    return;
  }

  // Check permissions & reject un-authorizeed requests
  const permitted = await checkCustomerPermissions({ response, config, requestingUser, requestedCustomer });
  if (!permitted) return;

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
  if (!account.isValid() || account.checkSum !== requestedCustomer.checkSum) {
    response.status(400).json({ error: { type: "missingData", message: "Unable to register user. Required information is missing.", data: account.missingAccountData() } })
    return;    
  }

  // Make sure all authedUsers are actually associated with the customer and have at least one permission, and that one user has manage permission
  const { authedUsers } = account;
  let managePermissionExists = false;
  const validAuthedUsers = authedUsers.map((u) => {
    if (u.permissions.length == 0) {
      u.permissions.push("read");
    } else if (u.permissions.includes("manage")) {
      managePermissionExists = true;
    }
    return u;
  }).filter(x => x.id == requestingUser.id);
  if (validAuthedUsers.length == 0) {
    response.status(400).json({ error: { type: "request", message: "Invalid request. No valid authed users for account." } });
    return;
  }
  if (managePermissionExists == false) {
    validAuthedUsers[0].permissions.push("manage");
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
  response.status(200).json({ ...createdAccount, account });
  return;
}

async function read(request, response) {
  // Reject non-authenticated requests
  const auth_token = request.headers.authorization?.split(" ")[1];
  const { userIsAuthenticated, user: requestingUser } = await authenticate(auth_token);
  if (!userIsAuthenticated) {
    APIError.authentication(response);
    return;
  }

  // Reject un-authorizeed requests
  const config = [ownsAccountCustomer, isAccountSuperadmin];
  let requestedAccount;
  try {
    const query = request.query;
    requestedAccount = await findDoc(query);
  } catch (e) {
    response.status(500).json({ error: { type: "db", message: "Database error.", data: e } })
    return;
  }
  
  // Check permissions & reject un-authorizeed requests
  const permitted = await checkPermissions({ response, config, requestingUser, requestedAccount: requestedAccount.data });
  if (!permitted) return;

  // Remove authed user data from account as it contains private keys
  delete requestedAccount.data.authedUsers;
  response.status(requestedAccount.code).json(requestedAccount.data);
  return;
}

async function update(request, response) {
  // Reject non-authenticated requests
  const auth_token = request.headers.authorization?.split(" ")[1];
  const { userIsAuthenticated, user: requestingUser } = await authenticate(auth_token);
  if (!userIsAuthenticated) {
    APIError.authentication(response);
    return;
  }

  // Reject un-authorizeed requests
  const config = [ownsAccountCustomer, isAccountSuperadmin];
  let requestedAccount;
  try {
    const query = { id: request.body.data.id };
    requestedAccount = (await findDoc(query)).data;
  } catch (e) {
    APIError.authorization(response);
    return;
  }
  if (requestedAccount == null) {
    APIError.authorization(response);
    return;
  }
  
  // Check permissions & reject un-authorizeed requests
  const permitted = await checkPermissions({ response, config, requestingUser, requestedAccount });
  if (!permitted) return;

  // Remove authed user data from account as it contains private keys
  delete requestedAccount.authedUsers;

  // Update account
  const result = await updateDoc({ id: request.body.id }, request.body.updates)

  response.status(200).json({ ...result, account: requestedAccount });
  return;  
}

async function del(request, response) {
  // Reject non-authenticated requests
  const auth_token = request.headers.authorization?.split(" ")[1];
  const { userIsAuthenticated, user: requestingUser } = await authenticate(auth_token);
  if (!userIsAuthenticated) {
    APIError.authentication(response);
    return;
  }

  // Reject un-authorizeed requests
  const config = [ownsAccountCustomer, isAccountSuperadmin];
  let requestedAccount;
  try {
    const query = { id: request.body.id };
    requestedAccount = (await findDoc(query)).data;
  } catch (e) {
    response.status(500).json({ error: { type: "db", message: "Database error.", data: e } })
    return;
  }
  if (requestedAccount == null) {
    APIError.authorization(response);
    return;
  }
  
  // Check permissions & reject un-authorizeed requests
  const permitted = await checkPermissions({ response, config, requestingUser, requestedAccount: requestedAccount });
  if (!permitted) return;

  // Remove authed user data from account as it contains private keys
  const result  = await deleteDoc({ id: request.body.id })

  // Delete account
  response.status(result.code).json(result.data);
  return;    
}

const controller = { create, read, update, del };
export default controller;