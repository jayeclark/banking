import CheckingAccount from "../models/Account/CheckingAccount.js";
import SavingsAccount from "../models/Account/SavingsAccount.js";
import InstallmentLoanAccount from "../models/Account/InstallmentLoanAccount.js";
import { checkAuthStatus, customerStatus, accountStatus } from "../services/helpers/auth.js";
import { getUserData } from "./user.js";
import { addDoc, findDoc, updateDoc, deleteDoc } from "../services/account.js";
import APIError from "../services/helpers/error.js";

async function create(request, response) {
  // Check auth status  
  const config = {
    type: "customer",
    id: request.body.customerID,
    validators: [customerStatus.isAdmin, customerStatus.isSuperAdmin]
  }
  const authIssue = await checkAuthStatus(request, config);
  if (authIssue) { APIError[authIssue](response); return; }

  // Create account object from request body
  const options = request.body;
  console.log(options);
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

  let requestingUser;
  try {
    requestingUser = await getUserData(request);
  } catch (e) {
    console.error(e);
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
    createdAccount = await addDoc(account);
  } catch (e) {
    console.error(e);
    APIError.db(response);
    return;
  }

  // Send account as response
  response.status(createdAccount.code).json({ ...createdAccount.data, account });
  return;
}

async function read(request, response) {
  // Check auth status 
  const config = {
    type: "account",
    id: request.query.id,
    validators: [accountStatus.isAdmin, accountStatus.isSuperAdmin]
  }
  const authIssue = await checkAuthStatus(request, config);
  if (authIssue) { APIError[authIssue](response); return; }

  // Get account
  let requestedAccount;
  try {
    requestedAccount = await findDoc({ id: request.query.id });
  } catch (e) {
    console.error(e);
    APIError.db(response);
    return;
  }

  // Remove authed user data from account
  delete requestedAccount.data.authedUsers;

  // Send account data 
  response.status(requestedAccount.code).json(requestedAccount.data);
  return;
}

async function update(request, response) {
  // Check auth status
  const config = {
    type: "account",
    id: request.body.id,
    validators: [accountStatus.isAdmin, accountStatus.isSuperAdmin]
  }
  const authIssue = await checkAuthStatus(request, config);
  if (authIssue) { APIError[authIssue](response); return; }

  // Update account
  let updateResult
  try {
    updateResult = await updateDoc({ id: request.body.id }, { $set: request.body.updates });
  } catch (e) {
    console.error(e);
    APIError.db(response);
    return;
  }

  // Send update data
  response.status(updateResult.code).json(updateResult.data);
  return;  
}

async function del(request, response) {
  // Check auth status
  const config = {
    type: "account",
    id: request.body.id,
    validators: [accountStatus.isAdmin, accountStatus.isSuperAdmin]
  }
  const authIssue = await checkAuthStatus(request, config);
  if (authIssue) { APIError[authIssue](response); return; }

  // Delete doc
  let deleteResult;
  try {
    deleteResult = await deleteDoc({ id: request.body.id })
  } catch (e) {
    console.error(e);
    APIError.db(response);
    return;
  }

  // Send account delete data
  response.status(deleteResult.code).json(deleteResult.data);
  return;    
}

const controller = { create, read, update, del };
export default controller;