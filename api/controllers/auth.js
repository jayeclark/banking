import bcrypt from "bcrypt";
import controller from "../controllers/user.js";
import { findDoc, updateDoc } from "../services/user.js";
import { isAuthenticated, makeAccessToken, decodeAccessToken } from "../services/helpers/auth.js";
import db from "../database.js";

const userCollection = db.collections.user;
const { create: createUser } = controller;

async function registerUser(request, response) { 
  createUser(request, response);
}

async function remindUsername(request, response) {

}

async function initiatePasswordReset(request, response) {

}

async function completePasswordReset(request, response) {

}

async function changePassword(request, response) {

}

async function loginUser(request, response) {

  let result;
  try {
    // retrieve user info from database
    result = await findDoc({ username: request.body.username })
  } catch (e) {
    response.status(500).json({ error: { type: "db", message: "Database error.", data: e } })
    return;
  }
  if (result.status !== 200) {
    response.status(result.status).json(result, data);
    return;
  }

  const user = result.data;
  const { password } = user;

  // compare passwords
  bcrypt.compare(password, hash, async (err, result) => {
    if (result) {
      // generate new access token & refresh token
      user.access_token = makeAccessToken({ username: user.username, id: user.id, email: user.email[user.primaryEmail] }, 14);
      user.refresh_token = makeRefreshToken({ username: user.username, id: user.id, email: user.email[user.primaryEmail] }, 365);
      
      // save in db
      const filter = { username: user.username };
      const updates = {
        $set: {
            access_token: user.access_token,
            refresh_token: user.refresh_token,
          },
      };
      const options = { upsert: false };
      let updateResult;
      try {
        updateResult = await updateDoc(filter, updates, options);
      } catch (e) {
        response.status(500).json({ error: { type: "db", message: "Database connection error.", data: e } });
        return;
      }

      // send back new auth credentials or error message
      response.status(updateResult.code).json(updateResult.data);
    }
    else {
      // send error info
      response.status(400).json({ error: { type: "credentials", message: "Invalid username or password!" }})
    }
  })
  return;
}

async function logoutUser(request, response) {
  const auth = request.headers.Authorization;
  if (auth && isAuthenticated(auth.split(" ")[1])) {
    const token = request.headers.Authorization.split(" ")[1];
    const decoded = decodeAccessToken(token);

    const filter = { username: decoded.username };
    const updates = {
      $set: {
        access_token: null,
      }
    }
    const options = { upsert: false };

    let result;
    try {
      result = await userCollection.updateOne(filter, updates, options);
    } catch (e) {
      response.status(500).json({ error: { type: "db", message: "Database error", data: e }})
    }
    response.status(200).json({ result });
  } else {
    response.redirect("/");
  }
}

const authController = {
  registerUser,
  initiatePasswordReset,
  remindUsername,
  initiatePasswordReset,
  completePasswordReset,
  changePassword,
  loginUser,
  logoutUser
}
export default authController;