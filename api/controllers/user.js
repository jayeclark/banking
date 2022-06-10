import User from "../models/User.js";
import { findDoc } from "../services/user.js";
import { insertDoc as addCustomer } from "../services/customer.js";
import db from "../database.js";
import { makeAccessToken } from "../services/helpers/auth.js";

const userCollection = db.collections.user;

export async function create(request, response) {
  const user = new User(request.body);

  if (!user.isValid()) {
    response.status(400).json({ error: { type: "missingData", message: "Unable to register user. Required information is missing.", data: user.missingData() } })
    return;
  }

  // Check if username is taken and return an error if taken
  const existingUserData = await findDoc(user);

  if (existingUserData.code == 200) {
    response.status(400).json({ error: { type: "duplicate", message: "Unable to register user. Username is not available."}})
    return;
  }
  
  // Create a customer account if this is not an add-on user to an existing account
  if (user.customerID == null) {
    const dbQuery = await addCustomer({ type: "personalBanking", name: `${user.firstName} ${user.lastName}` });
    if (dbQuery.code !== 200) {
      response.status(dbQuery.code).json(dbQuery.data);
      return;
    }
    user.customerID = dbQuery.data.customer.id;
  }

  // Generate initial auth credentials
  user.access_token = makeAccessToken({ username: user.username, id: user.id, email: user.email[user.primaryEmail] }, 14);
  user.refresh_token = makeAccessToken({ username: user.username, id: user.id, email: user.email[user.primaryEmail] }, 365);

  // Create user
  let createdUser;
  try {
    createdUser = await userCollection.insertOne(user);
  } catch (e) {
    response.status(500).json({ error: { type: "unknown", message: e } });
    return;
  }
  // send user as response
  response.status(200).json({ ...createdUser, user });
  return;
}

export async function read(request, response) {
  let userData;
  try {
    // retrieve user info from database
    const query = request.query;
    const auth_token = request.headers.Authorization.split(" ")[1];
    userData = await findDoc(query, auth_token);
  } catch (e) {
    response.status(500).json({ error: { type: "db", message: "Database error.", data: e } })
    return;
  }
  response.status(userData.status).json(userData.data);
}
export function update(request, response) {
  
}
export function del(request, response) {
  
}




const controller = { create, read, update, del };
export default controller;