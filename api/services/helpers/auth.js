import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "./environment.js";
import { findDoc as findUser } from "../user.js";
import { findDoc as findCustomer } from "../customer.js";
import { findDoc as findAccount } from "../account.js";
import { checkPermissions } from "./validation.js";

export const isAuthenticated = async (auth_token) => {
  const decoded = jwt.decode(auth_token);

  if (decoded.username == null || typeof decoded.username == "undefined") {
    return {userIsAuthenticated: false, user: null};
  }

  const user = await findUser({ username: decoded.username });
  if (user.data && user?.data?.access_token == auth_token) {
    return {userIsAuthenticated: true, user: user.data};
  }
  return {userIsAuthenticated: false, user: null};
}

export async function authenticate(request) {
  const auth_token = request.headers.authorization?.split(" ")[1];
  if (typeof auth_token == undefined || auth_token == null) {
    return { userIsAuthenticated: false, user: null };
  }
  const result = await isAuthenticated(auth_token);
  return result;
};

export async function checkAuthStatus(request, config) {

  // Reject unauthenticated requests
  const { userIsAuthenticated, user: requestingUser } = await authenticate(request);
  if (!userIsAuthenticated) { return "authentication"; } 

  // Reject unauthorized requests
  const { type, id, validators } = config;
  const permitted = await checkPermissions({ type, validators, requesting: requestingUser, requestedID: id });
  if (!permitted) { return "authorization"; }
  return null;
}

const isSuperAdmin = async (requestingUser) => requestingUser.superAdmin == true;

export const userStatus = {
  isSelf: async (requestingUser, requestedUser) => {
    return requestingUser?.id == requestedUser?.id;
  },
  isAdmin: async (requestingUser, requestedUser) => {
    const customer = (await findCustomer({ id: requestedUser.customerID })).data;
    return (requestingUser.customerID == requestedUser.customerID) && requestingUser.admin && customer.creator !== requestedUser.id;
  },
  isSuperAdmin
}

export const customerStatus = {
  isAdmin: async (requestingUser, requestedCustomer) => {
    return requestingUser.admin == true && requestingUser.customerID == requestedCustomer.id;
  },
  isSuperAdmin
};

export const accountStatus = {
  isAdmin: async (requestingUser, requestedAccount) => {
    return requestingUser.admin == true && requestingUser.customerID == requestedAccount.customerID;
  },
  isSuperAdmin
};

export const transactionStatus = {
  isAdmin: async (requestingUser, requestedTransaction) => {
    return requestingUser.admin == true && requestingUser.customerID == requestedTransaction.customerID;
  },
  isSuperAdmin
};


export const makeAccessToken = (payload, expires_in_days) => {
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: `${expires_in_days}d`});
}

export const decodeAccessToken = (token) => {
  return jwt.decode(token);
}

export const generateAccountChecksum = (_id) => {
  let sum = 0;
  let mod = 0;
  let int = 123456;
  for (let i = 0; i < _id.length; i++) {
    mod += int % _id.charCodeAt(i);
    sum += _id.charCodeAt(i);
  }
  return sum + mod;
}