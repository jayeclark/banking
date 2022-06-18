import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "./environment.js";
import { findDoc as findUser } from "../../services/user.js";
import { findDoc as findCustomer } from "../customer.js";

export const isAuthenticated = async (auth_token) => {
  const decoded = jwt.decode(auth_token);

  if (decoded.username == null || typeof decoded.username == "undefined") {
    return {userIsAuthenticated: false, user: null};
  }

  const user = await findUser({ username: decoded.username });
  if (user.data.access_token == auth_token) {
    return {userIsAuthenticated: true, user: user.data};
  }
  return {userIsAuthenticated: false, user: null};
}

export async function authenticate(auth_token) {
  if (typeof auth_token == undefined || auth_token == null) {
    return { userIsAuthenticated: false, user: null };
  }
  const result = await isAuthenticated(auth_token);
  return result;
};

export const isSameUser = async (requestingUser, requestedUser) => {
  return requestingUser.id == requestedUser.id;
}

export const isCustomerAdmin = async (requestingUser, requestedUser) => {
  const customer = (await findCustomer({ id: requestedUser.customerID })).data;
  return (requestingUser.customerID == requestedUser.customerID) && requestingUser.admin && customer.creator !== requestedUser.id;
}

export const isSuperadmin = async (requestingUser, requestedUser) => {
  return requestingUser.superadmin && !requestedUser.superadmin;
}

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