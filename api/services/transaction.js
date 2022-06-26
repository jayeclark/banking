import db from "../database.js";

const transactionCollection = db.collections.transaction;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* DATA ABSTRACTION METHODS  
/*  Return an object: {
/*                      code: number 
/*                      data: payload or error as object
/*                    }     
/* CONTENTS  
/* findDoc - finds a single transaction record  
/* findAll - finds all transactions on a given account                           
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

export async function addDoc(data) {
  let result = {
    data: null,
    code: 200
  };
  try {
    result.data = await transactionCollection.insertOne(data);
  } catch (e) {
    result.code = 500;
    result.data = { error: { type: "db", message: "Database error.", data: e } };
  }
  return result;
}

export async function findDoc(filter) {
  let result = { data: null, code: 200 };
  // If no filter id was provided, return an error
  if (filter.id == undefined) {
    result.code = 500;
    result.data = { error: { type: "db", message: "No query data provided to retrieve account." } };
    return result;
  }  

  // Retrieve transaction info
  try {
    result.data = await transactionCollection.findOne(filter);
    if (result.data == null) {
      result.code = 500;
    }
  } catch (e) {
    result.code = 500;
    result.data = { error: { type: "db", message: "Database error.", data: e } };
  }
  return result;
}

export async function findAll(filter) {
  let result = { data: null, code: 200 };

  // If no account ID was provided, return an error
  if (filter.accountID == undefined) {
    result.code = 500;
    result.data = { error: { type: "db", message: "No query data provided to retrieve account." } };
    return result;
  }  

  // Retrieve transaction info
  try {
    result.data = await transactionCollection.find(filter).toArray();
    result.code = result.data == null ? 500 : 200;
  } catch (e) {
    result.code = 500;
    result.data = { error: { type: "db", message: "Database error.", data: e } };
  }
  return result;
}

export async function updateDoc(filters, updates, options) {
  let result = {
    data: null,
    code: 200
  };
  try {
    result.data = await transactionCollection.updateOne(filters, updates, options || { upsert: false });
  } catch (e) {
    result.code = 500;
    result.data = { error: { type: "db", message: "Database error.", data: e } };
  }
  return result;
}

export async function deleteDoc({ id }) {
  let result = {
    data: null,
    code: 200
  };
  try {
    result.data = await transactionCollection.deleteOne({ id });
  } catch (e) {
    result.code = 500;
    result.data = { error: { type: "db", message: "Database error.", data: e } };
  }
  return result;
}