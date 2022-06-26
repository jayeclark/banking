import bcrypt from "bcrypt";
import controller from "../controllers/user.js";
import { findDoc, updateDoc } from "../services/user.js";
import { isAuthenticated, makeAccessToken, decodeAccessToken } from "../services/helpers/auth.js";

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
    console.log(request.body);
    result = await findDoc({ username: request.body.username })
    console.log(result.data);
  } catch (e) {
    console.log(e);
    response.status(500).json({ error: { type: "db", message: "Database error.", data: e } });
    return;
  }
  console.log(result.code);
  if (result.code !== 200) {
    response.status(result.code).json(result.data);
    return;
  }

  const user = result.data;
  const { password: hashedPassword } = user;

  // compare passwords
  bcrypt.compare(request.body.password, hashedPassword, async (err, result) => {
    if (result) {
      // generate new access token & refresh token
      user.access_token = makeAccessToken({ username: user.username, id: user.id, email: user.email[user.primaryEmail] }, 14);
      user.refresh_token = makeAccessToken({ username: user.username, id: user.id, email: user.email[user.primaryEmail] }, 365);
      
      // save in db
      const filter = { username: user.username };
      const updates = {
        access_token: user.access_token,
        refresh_token: user.refresh_token,
      };
      const options = { upsert: false };
      let updateResult;
      try {
        updateResult = await updateDoc(filter, updates, options);
        updateResult.data.access_token = user.access_token;
        updateResult.data.refresh_token = user.refresh_token;
      } catch (e) {
        response.status(500).json({ error: { type: "db", message: "Database connection error.", data: e } });
        return;
      }

      // send back new auth credentials or error message
      response.status(updateResult.code).json(updateResult.data);
      return;
    }
    else {
      // send error info
      response.status(400).json({ error: { type: "credentials", message: "Invalid username or password!" }})
    }
  })
  return;
}

async function logoutUser(request, response) {
  const auth = request.headers.authorization;
  if (auth && isAuthenticated(auth.split(" ")[1])) {
    const token = request.headers.authorization.split(" ")[1];
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
      result = await updateDoc(filter, updates, options);
    } catch (e) {
      response.status(500).json({ error: { type: "db", message: "Database error", data: e }})
    }
    response.status(200).json({ result });
  } else {
    response.status(500).json({ error: { type: "auth", message: "Not logged in." }});
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