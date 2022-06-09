import jwt from "jsonwebtoken";

export const isAuthenticated = (req) => {
  const headers = req.headers;
  const token = headers.Authorization.split(" ")[1];
  if (jwt.isAuthenticated(req)) {
    return true;
  }
  return false;
}
