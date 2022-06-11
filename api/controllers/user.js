import User from "../models/User.js";
import { findDoc } from "../services/user.js";
import { insertDoc as addCustomer } from "../services/customer.js";
import db from "../database.js";
import { makeAccessToken, decodeAccessToken, isAuthenticated } from "../services/helpers/auth.js";

const userCollection = db.collections.user;

export async function create(request, response) {
  const user = new User(request.body);

  // Throw an error if the data provided was not correct/complete
  if (!user.isValid()) {
    response.status(400).json({ error: { type: "missingData", message: "Unable to register user. Required information is missing.", data: user.missingData() } })
    return;
  }

  await user.addPassword(request.body.password);
  // Check if username is taken and return an error if taken
  const existingUserData = await findDoc(user);

  if (existingUserData.code == 200) {
    response.status(400).json({ error: { type: "duplicate", message: "Unable to register user. Username is not available."}})
    return;
  }
  
  // Create a customer account, and set user to admin, if this is not an add-on user to an existing account
  if (user.customerID == null) {
    const dbQuery = await addCustomer({ type: "personalBanking", name: `${user.firstName} ${user.lastName}` });
    if (dbQuery.code !== 200) {
      response.status(dbQuery.code).json(dbQuery.data);
      return;
    }
    user.customerID = dbQuery.data.customer.id;
    user.admin = true;
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

  // Reject non-authenticated requests
  const auth_token = request.headers.authorization.split(" ")[1];
  if (!isAuthenticated(auth_token)) {
    response.status(500).json({ error: { type: "auth", message: "Authentication error.", data: e } })
    return;
  }

  // Retrieve user info from database
  let userData;
  try {
    const query = request.query;
    userData = await findDoc(query);
  } catch (e) {
    response.status(500).json({ error: { type: "db", message: "Database error.", data: e } })
    return;
  }

  // Send response early if not successful 
  if (userData.code !== 200) {
    response.status(userData.code).json(userData.data);
  }

  // Do not send response if user does not have permission to access the info
  let validRequest = false;
  let user = userData.data;
  let { id: requesterID } = decodeAccessToken(auth_token);
  const { data: requestingUser } = await findDoc({ id: requesterID });
  console.log(requestingUser);

  // Remove password and _id from data
  delete user.password;
  delete user._id;

  // Request is valid if the user is accessing their own data.
  if (requestingUser.id == user.id) { validRequest = true;}

  // Delete sensitive fields if requesting user !== user
  if (!validRequest) {
      delete user.birthDate;
      delete user.access_token;
      delete user.refresh_token;
  }
  // Request is valid if the user is a superadmin, but some info is removed.
  if (requestingUser.superadmin == true) { validRequest = true; }
  
  // Delete/mask sensitive fields if requesting user !== user or superadmin
  if (!validRequest) {
    delete user.contactPreferences;
    delete user.address;
    delete user.primaryAddress;
    const phone = user.phone.map(x => {
      const final4 = x.match(/\d{4}$/);
      const masked = x.replace(/\d/g, "*").replace(/\*{4}$/, final4);
      return masked;
    });
    user.phone = phone;
  }
  // Request is valid if the user is an admin for the customer, b.
  if (requestingUser.admin && user.customerID == requestingUser.customerID) {
    validRequest = true;
  }

  // Return error is request is invalid
  if (!validRequest) {
    response.status(500).json({ error: { type: "auth", message: "User is not authorized to access that content." } });
    return;
  }

  response.status(userData.status).json(user);
  return;
}
export function update(request, response) {
  
}
export function del(request, response) {
  
}




const controller = { create, read, update, del };
export default controller;