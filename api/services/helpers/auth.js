import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "./environment.js";
import { findDoc } from "../../services/user.js";

export const isAuthenticated = async (auth_token) => {
  const decoded = jwt.decode(auth_token);
  const user = await findDoc({ username: decoded.username });
  if (user.access_token == auth_token) {
    return true;
  }
  return false;
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