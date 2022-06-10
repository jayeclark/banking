import Customer from "../models/Customer.js";
import db from "../database.js";
import { generateAccountChecksum } from "./helpers/auth.js";

const customerCollection = db.collections.customer;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */ 
/* DATA ABSTRACTION METHODS  
/*  Return an object: {
/*                      code: number 
/*                      data: payload or error as object
/*                    }     
/* CONTENTS   
/* insertDoc - creates a new customer
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
export async function insertDoc({ type, name }) {
  let result = {
    code: 200,
    data: null,
  };

  const customer = new Customer({ type, name });
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
    await updateDoc({ id: result.data.id }, updates)
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
  result.data = await customerCollection.updateOne(filter, updates, options = { upsert: false });
  // TODO: Send garbage data and check what the response is from mongo, update this function accordingly
  return result;
}