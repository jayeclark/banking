import Customer from "../models/Customer.js";
import db from "../database.js";
import { generateAccountChecksum } from "./helpers/auth.js";
import APIError from "./helpers/error.js";

const customerCollection = db.collections.customer;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* DATA ABSTRACTION METHODS  
/*  Return an object: {
/*                      code: number 
/*                      data: payload or error as object
/*                    }     
/* CONTENTS   
/* findDoc - finds a customer
/* insertDoc - creates a new customer
/* updateDoc - updates a customer
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
export async function findDoc(query) {
  let result = { data: null, code: 200 };
  // If there are no filters, return an error
  if (query == undefined || !query.hasOwnProperty("id")) {
    result.code = 500;
    result.data = { error: { type: "db", message: "No query data provided to retrieve customer." } };
    return result;
  }
  
  const filter = { id: query.id };

  // Retrieve account info from database
  try {
    result.data = await customerCollection.findOne(filter);
   // result.code = result.data == null ? 500 : 200;
  } catch (e) {
    result.code = 500;
    result.data = { error: { type: "db", message: "Database error.", data: e } };
  }

  return result;
}

export async function addDoc({ type, name, userID }) {
  let result = {
    code: 200,
    data: null,
  };

  const customer = new Customer({ type, name, userID });
  try {
    result.data = await customerCollection.insertOne(customer);
    // add checksum and update record
    const checkSum = generateAccountChecksum(result.data.insertedId.toString());
    customer.checkSum = checkSum;
    const updates = {
      $set: {
        checkSum: checkSum
      }
    };
    await updateDoc({ id: customer.id }, updates);
    result.data.customer = customer;
  } catch (e) {
    result.data = e;
    result.code = 500;
  }
  return result;
}

export async function updateDoc(filter, updates, options) {
  let result = {
    code: 200,
    data: null
  }
  try {
    result.data = await customerCollection.updateOne(filter, updates, options || { upsert: false });
  } catch (e) {
    result.data = e;
    result.code = 500;
  }
  // TODO: Send garbage data and check what the response is from mongo, update this function accordingly
  return result;
}

export async function deleteDoc(filter) {
  let result = {
    code: 200,
    data: null
  }
  try {
    result.data = await customerCollection.deleteOne(filter);
  } catch (e) {
    result.data = e;
    result.code = 500;
  }
  return result;
}