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

export async function findAll(accountID) {
  let result = { data: null, code: 200 };

  // If no account ID was provided, return an error
  if (accountID == undefined) {
    result.code = 500;
    result.data = { error: { type: "db", message: "No query data provided to retrieve account." } };
    return result;
  }  

  const filter = { accountID }

  // Retrieve transaction info
  try {
    result.data = await transactionCollection.findAll(filter);
    result.code = result.data == null ? 500 : 200;
  } catch (e) {
    result.code = 500;
    result.data = { error: { type: "db", message: "Database error.", data: e } };
  }
  return result;
}
