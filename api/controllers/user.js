import User from "../models/User.js";
import { addDoc, findDoc, updateDoc, deleteDoc } from "../services/user.js";
import { addDoc as addCustomer, deleteDoc as deleteCustomer } from "../services/customer.js";
import { deleteMany as deleteAccounts } from "../services/account.js";
import APIError from "../services/helpers/error.js";
import db from "../database.js";
import { makeAccessToken, checkAuthStatus, authenticate, userStatus } from "../services/helpers/auth.js";

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
    createdUser = await addDoc(user);
  } catch (e) {
    APIError.db(response, e);
    return;
  }

  // send user as response
  response.status(200).json({ ...createdUser, user });
  return;
}

export async function read(request, response) {
  // Check auth status  
  const config = {
    type: "user",
    id: request.query.id,
    validators: [userStatus.isSelf, userStatus.isAdmin, userStatus.isSuperAdmin]
  }
  const authIssue = await checkAuthStatus(request, config);
  if (authIssue) { APIError[authIssue](response); return; }
  let requestedUser;
  try {
    requestedUser = await findDoc({ id: request.query.id });
  } catch (e) {
    console.error(e);
    APIError.db(response);
    return;
  }
  let user = requestedUser;

  // Delete sensitive fields 
  delete user.data.password;
  delete user.data._id;
  delete user.data.birthDate;
  delete user.data.access_token;
  delete user.data.refresh_token;
  delete user.data.contactPreferences;
  delete user.data.address;
  delete user.data.primaryAddress;
  const phone = user.data.phone.map(x => {
    const final4 = x.match(/\d{4}$/);
    const masked = x.replace(/\d/g, "*").replace(/\*{4}$/, final4);
    return masked;
  });
  user.phone = phone;

  console.log('read:\n', user.id);
  response.status(user.code).json(user.data);
  return;
}

export async function update(request, response) {
  // Check auth status  
  const config = {
    type: "user",
    id: request.body.id,
    validators: [userStatus.isSelf, userStatus.isAdmin, userStatus.isSuperAdmin]
  }
  const authIssue = await checkAuthStatus(request, config);
  if (authIssue) { APIError[authIssue](response); return; }

  // Update record
  let updateResult;
  try {
    updateResult = await updateDoc({ id: request.body.id }, request.body.updates, { upsert: false });
  } catch (e) {
    console.error(e);
    APIError.db(response);
    return;
  }

  console.log('updated:\n', updateResult.data);
  response.status(updateResult.code).json(updateResult.data);
  return;
}

export async function del(request, response) {
  // Check auth status  
  const config = {
    type: "user",
    id: request.body.id,
    validators: [userStatus.isSelf, userStatus.isAdmin, userStatus.isSuperAdmin]
  }
  const authIssue = await checkAuthStatus(request, config);
  if (authIssue) { APIError[authIssue](response); return; }

  // Delete user
  let deleteResult;
  try { 
    const userData = await getUserData(request);
    deleteResult = await deleteDoc({ id: request.body.id })
    if (userData?.admin == true) {
    deleteAccounts({ customerID: userData.customerID });
    deleteCustomer({ id: userData.customerID });
  }
  } catch (e) {
    console.error(e);
    APIError.db(response);
    return;
  }
  console.log('deleted:\n', deleteResult);
  response.status(deleteResult.code).json(deleteResult.data);
  return;
}

export async function getUserData(request) {
  const result = await authenticate(request);
  return result.user;
}

const controller = { create, read, update, del };
export default controller;