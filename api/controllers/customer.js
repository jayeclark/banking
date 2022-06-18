import {
  isAuthenticated,
  decodeAccessToken,
  authenticate,
  ownsCustomer,
  isCustomerSuperadmin
} from "../services/helpers/auth.js";
import { findDoc as findUser } from "../services/user.js";
import { checkPermissions, getRequestedCustomer } from "../services/customer.js";
import { findAll as findAllAccounts, getAccountBalance } from "../services/account.js";
import APIError from "../services/helpers/error.js";
import db from "../database.js";

const customerCollection = db.collections.customer;

async function create(request, response) {
  console.log("create goes here");
}

async function read(request, response) {
  // Reject non-authenticated requests
  const auth_token = request.headers.authorization.split(" ")[1];
  const { userIsAuthenticated, user: requestingUser } = await authenticate(auth_token);
  if (!userIsAuthenticated) {
    APIError.authentication(response);
    return;
  }  

  // Reject un-authorizeed requests
  const config = [ownsCustomer, isCustomerSuperadmin];

  // Get requesting and requested user
  const requestedCustomer = await getRequestedCustomer(request.query.id, response);
  if (requestedCustomer === null) return;

  // Check permissions & reject un-authorizeed requests
  const permitted = await checkPermissions({ response, config, requestingUser, requestedCustomer });
  if (!permitted) return;

  response.status(200).json(requestedCustomer);
  return;
}

async function readAccounts(request, response) {
  // Reject non-authenticated requests
  const auth_token = request.headers.authorization.split(" ")[1];
  if (!isAuthenticated(auth_token)) {
    response.status(401).json({ error: { type: "auth", message: "Authentication error.", data: e } })
    return;
  }

  // Reject if requesting user is not from customer and is not superadmin
  const { id: requesterID } = decodeAccessToken(auth_token);
  const { data: requestingUser } = await findUser({ id: requesterID });
  if (requestingUser.customerID !== request.query.id && !requestingUser.superadmin) {
    response.status(403).json({ error: { type: "auth", message: "Authorizaiton error.", data: e } })
    return;
  }

  // Find all accounts for customer
  const accountData = findAllAccounts({ id: request.query.id });

  // Return if code is not 200
  if (accountData.code !== 200) {
    response.status(accountData.code).json(accountData.data);
    return;
  }

  const accounts = accountData.data;
  // If requester is not an admin, only return the accounts which the requester has permissions on
  let visibleAccounts;
  if (!requestingUser.admin) {
    visibleAccounts = accounts.filter(a => {
      const authedUsers = a.authedUsers.filter(x => x._id == requestingUser._id)
      if (authedUsers.length > 0) {
        return true;
      }
      return false;
    }).map(a => {
      delete a.authedUsers;
      delete a._id;
      return a;
    })
  }
  visibleAccounts = visibleAccounts.map(async (a) => {
    delete a.authedUsers;
    delete a._id;
    a.balance = await getAccountBalance(a.id);
    return a;
  })

  // Send account data
  response.status(200).json(visibleAccounts);
  return;
}

async function update(request, response) {
  console.log("udpate goes here");
}
async function del(request, response) {
  console.log("del goes here");
}


const controller = { create, read, readAccounts, update, del };
export default controller;