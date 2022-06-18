import User from "../models/User.js";
import { findDoc, updateDoc, deleteDoc, getRequestedUser, checkPermissions } from "../services/user.js";
import { insertDoc as addCustomer } from "../services/customer.js";
import APIError from "../services/helpers/error.js";
import db from "../database.js";
import {
  makeAccessToken,
  authenticate,
  isSameUser,
  isCustomerAdmin,
  isSuperadmin
} from "../services/helpers/auth.js";


const userCollection = db.collections.user;

export async function create(request, response) {

  const user = new User(request.body);

  // Throw an error if the data provided was not correct/complete
  await user.addPassword(request.body.password);

  if (!user.isValid()) {
    APIError.missingData(response, user.missingData());
    return;
  }

  // Check if username is taken and return an error if taken
  const existingUserData = await findDoc(user);

  if (existingUserData.code == 200) {
    APIError.duplicate(response);
    return;
  }
  
  // Create a customer account, and set user to admin, if this is not an add-on user to an existing account
  if (user.customerID == null || typeof user.customerID == "undefined") {
    const dbQuery = await addCustomer({ type: "personalBanking", name: `${user.firstName} ${user.lastName}`, userID: user.id });
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
    APIError.db(response, e);
    return;
  }

  // send user as response
  response.status(200).json({ ...createdUser, user });
  return;
}

export async function read(request, response) {
  // Reject non-authenticated requests
  const auth_token = request.headers.authorization.split(" ")[1];
  const { userIsAuthenticated, user: requestingUser } = await authenticate(auth_token);
  if (!userIsAuthenticated) {
    APIError.authentication(response);
    return;
  }
  // Reject un-authorizeed requests
  const config = [isSameUser, isCustomerAdmin, isSuperadmin];

  // Get requesting and requested user
  const requestedUser = await getRequestedUser(request.query.id, response);
  if (requestedUser === null) return;

  // Check permissions & reject un-authorizeed requests
  const permitted = await checkPermissions({ response, config, requestingUser, requestedUser });
  if (!permitted) return;

  let user = requestedUser;
  // Remove password and _id from data
  delete user.password;
  delete user._id;

  // Delete sensitive fields if requesting user !== user
  if (requestedUser.id !== requestingUser.id) {
      delete user.birthDate;
      delete user.access_token;
      delete user.refresh_token;
  }

  // Delete/mask sensitive fields if requesting user !== user or superadmin
  if (requestedUser.id !== requestingUser.id && !requestingUser.superadmin) {
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
  console.log('read:\n', user.id);
  response.status(200).json(user);
  return;
}

export async function update(request, response) {
  // Reject non-authenticated requests
  const auth_token = request.headers.authorization.split(" ")[1];
  const { userIsAuthenticated, user: requestingUser } = await authenticate(auth_token);
  if (!userIsAuthenticated) {
    APIError.authentication(response);
    return;
  }

  // Reject un-authorizeed requests
  const config = [isSameUser, isCustomerAdmin, isSuperadmin];

  // Get requesting and requested user
  const requestedUser = await getRequestedUser(request.body.data.id, response);
  if (requestedUser === null) return;

  // Check permissions & reject un-authorizeed requests
  const permitted = await checkPermissions({ response, config, requestingUser, requestedUser });
  if (!permitted) return;

  // Update record
  const result = await updateDoc({ id: request.body.data.id }, request.body.data.updates, { upsert: false })
  if (result.code !== 200) {
    APIError.db(response);
    return;
  }
  console.log('updated:\n', result.data);
  response.status(200).json(result);
  return;
}

export async function del(request, response) {
  // Reject non-authenticated requests
  const auth_token = request.headers.authorization.split(" ")[1];
  const { userIsAuthenticated, user: requestingUser } = await authenticate(auth_token);
  if (!userIsAuthenticated) {
    APIError.authentication(response);
    return;
  }
  // Reject un-authorizeed requests
  const config = [isSameUser, isCustomerAdmin, isSuperadmin];

  // Get requesting and requested user
  const requestedUser = await getRequestedUser(request.body.id, response);
  if (requestedUser === null) return;

  // Check permissions & reject un-authorizeed requests
  const permitted = await checkPermissions({ response, config, requestingUser, requestedUser });
  if (!permitted) return;

  // Delete user
  const result = await deleteDoc({ id: request.body.id })
  console.log('deleted:\n', result);
  response.status(result.code).json(result);
  return;
}

const controller = { create, read, update, del };
export default controller;