import { isAuthenticated } from "../services/helpers/auth.js";
import db from "../database.js";

const userCollection = db.collections.user;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */ 
/* DATA ABSTRACTION METHODS  
/*  Return an object: {
/*                      code: number 
/*                      data: payload or error as object
/*                    }     
/* CONTENTS                               
/* findDoc - finds a specific user
/* findAll - finds all users in the bank
/* findAllCustomerUsers - finds all users associated with a specific customer (ie a business)   
/* updateDoc - updates the user record in the database
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
export async function findDoc(query, auth_token) {
  let result = {
    data: null,
    code: 200
  };
  if (query == undefined) {
    // If there are no filters, see if the user is authed to get all for their org or the bank
    // TODO: complete logic here
    result = findAll(auth_token);
  } else {
    const filter = {};
    switch (query) {
      case query.hasOwnProperty("username"):
        filter.username = query.username;
        break;
      case query.hasOwnProperty("primaryEmail" && query.hasOwnProperty("email")):
        filter.email = query.email[primaryEmail];
        break;
      case query.hasOwnProperty("id"):
        filter.id = query.id;
        break;
      default:
        filter.username = query.username;
    }
    try {
      // retrieve user info from database
      result.data = await userCollection.findOne(filter);
      result.code = result.data == null ? 500 : 200;
    } catch (e) {
      result.code = 500;
      result.data = { error: { type: "db", message: "Database error.", data: e } };
    }
  }
  return result;
}

export async function findAll(auth_token) {
  if (isAuthenticated(auth_token)) {
    
  }
}

export async function findAllCustomerUsers(auth_token) {
  if (isAuthenticated(auth_token)) {
    
  }
}

export async function updateDoc(filter, updates, options) {
  let result = {
    code: 200,
    data: null
  }
  result.data = await userCollection.updateOne(filter, updates, options);
  // TODO: Send garbage data and check what the response is from mongo, update this function accordingly
  return result;
}

// TODO: Add update validation functions