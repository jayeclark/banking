import { checkAuthStatus, authenticate, customerStatus } from "../services/helpers/auth.js";
import { findDoc } from "../services/customer.js";
import { findAll as findAllAccounts, getAccountBalance } from "../services/account.js";
import APIError from "../services/helpers/error.js";

async function create(request, response) {
  console.log("create goes here");
}

async function read(request, response) {
  // Check auth status  
  const config = {
    type: "customer",
    id: request.query.id,
    validators: [customerStatus.isAdmin, customerStatus.isSuperAdmin]
  }
  const authIssue = await checkAuthStatus(request, config);
  if (authIssue) { APIError[authIssue](response); return; }

  // Fetch customer
  let requestedCustomer;
  let error;
  try {
    requestedCustomer = await findDoc({ id: request.query.id });
  } catch (e) {
    console.error(e);
    error = true;
  }
  if (error) {
    APIError.db(response);
    return;
  }
  // Send customer info
  response.status(requestedCustomer.code).json(requestedCustomer.data);
  return;
}

async function readAccounts(request, response) {
  console.log(request.query);
  // Check auth status  
  const config = {
    type: "customer",
    id: request.query.id,
    validators: [customerStatus.isAdmin, customerStatus.isSuperAdmin]
  }
  const authIssue = await checkAuthStatus(request, config);
  if (authIssue) { APIError[authIssue](response); return; }

  // Find all accounts for customer
  let accountData;
  try { 
    accountData = await findAllAccounts({ customerID: { $eq: request.query.id } });
  } catch (e) {
    console.error(e);
    APIError.db(response);
    return;
  }

  // Return if code is not 200
  if (accountData.code !== 200) {
    console.log(accountData);
    response.status(accountData.code).json(accountData.data);
    return;
  }

  console.log(accountData);
  const accounts = accountData.data;
  const requestingUser = await getUserData(request);
  console.log('U', requestingUser);

  // If requester is not an admin, only return the accounts which the requester has permissions on
  let visibleAccounts;
  if (!requestingUser.admin && !requestingUser.superAdmin) {
    visibleAccounts = accounts.filter(a => {
      const authedUsers = a.authedUsers.filter(x => x._id == requestingUser._id)
      if (authedUsers.length > 0) {
        return true;
      }
      return false;
    })
  } else {
    visibleAccounts = accounts;
  }
  const result = [];
  visibleAccounts = await visibleAccounts.forEach(async (a) => {
    delete a.authedUsers;
    delete a._id;
    console.log('AAAAA', a);
    a.balance = await getAccountBalance(a.id);
    result.push(a);
  })
  console.log(result);
  // Send account data
  response.status(200).json(result);
  return;
}

async function update(request, response) {
  console.log("udpate goes here");
}
async function del(request, response) {
  console.log("del goes here");
}

async function getUserData(request) {
  const result = await authenticate(request);
  return result.user;
}

const controller = { create, read, readAccounts, update, del };
export default controller;