import db from "../database.js";
import { findAll } from "./transaction.js";

const accountCollection = db.collections.account;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */ 
/* DATA ABSTRACTION METHODS  
/*  Return an object: {
/*                      code: number 
/*                      data: payload or error as object
/*                    }     
/* CONTENTS     
/* findDoc - finds a specific account  
/* getAccountBalance - gets the current account balance                        
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
export async function findDoc(query) {
  let result = { data: null, code: 200 };
  
  // If there are no filters, return an error
  if (query == undefined || !query.hasOwnProperty("id")) {
    result.code = 500;
    result.data = { error: { type: "db", message: "No query data provided to retrieve account." } };
    return result;
  }
  
  const filter = { id: query.id };

  // Retrieve account info from database
  try {
    result.data = await accountCollection.findOne(filter);
    result.code = result.data == null ? 500 : 200;
  } catch (e) {
    result.code = 500;
    result.data = { error: { type: "db", message: "Database error.", data: e } };
  }

  return result;
}

export async function getAccountBalance(id) {
  // get all transactions 
  const transactions = findAll(id);

  // if no transactions, return 0
  if (transactions.length == 0) { 
    return 0;
  }
  // add transactions up to get balance
  let balance = 0;
  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];
    balance += transaction.type == "debit" ? -transaction.amount : transaction.amount;
  }
  return balance;
}