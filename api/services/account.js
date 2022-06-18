import db from "../database.js";
import CheckingAccount from "../models/Account/CheckingAccount.js";
import SavingsAccount from "../models/Account/SavingsAccount.js";
import InstallmentLoanAccount from "../models/Account/InstallmentLoanAccount.js";
import { findAll as findAllTransactions } from "./transaction.js";
import { generateAccountChecksum } from "./helpers/auth.js";
import APIError from "./helpers/error.js";

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

export async function findAll(query) {
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
    result.data = await accountCollection.find(query);
    result.code = result.data == null ? 500 : 200;
  } catch (e) {
    result.code = 500;
    result.data = { error: { type: "db", message: "Database error.", data: e } };
  }

  return result;
}

export async function insertDoc({
  type,
  nickname,
  interestRate,
  monthlyFee,
  customerID,
  checkSum,
  onlineOnly,
  monthlyTransactionLimit,
  interestAccrualStarts,
  paymentsStart,
  totalPayments,
  paymentPeriod
}) {
  let result = {
    code: 200,
    data: null,
  }
  let account;
  let initialProps = {
    type,
    nickname,
    interestRate,
    monthlyFee,
    customerID,
    checkSum,
  };
  if (type == "checking") {
    account = new CheckingAccount({ ...initialProps, onlineOnly });
  }
  if (type == "savings") {
    account = new SavingsAccount({ ...initialProps, monthlyTransactionLimit });
    }
  if (type == "installment") {
    account = new InstallmentLoanAccount({
      ...initialProps,
      interestAccrualStarts,
      paymentsStart,
      totalPayments,
      paymentPeriod
    });
  }
  try {
    result.data = await accountCollection.insertOne(account);
    const checkSum = generateAccountChecksum(result.data.insertedId.toString());
    account.checkSum = checkSum;
    const updates = {
      $set: {
        checkSum: checkSum
      }
    };
    await updateDoc({ id: result.data.id }, updates);
    result.data.account = account;
  } catch (e) {
    result.data = e;
    result.code = 500;
  }
  return result;
}

export async function updateDoc(filter, updates, options) {
  let result = {
    code: 200,
    data: null,
  }
  try {
    result.data = await accountCollection.updateOne(filter, updates, options || { upsert: false });
  } catch (e) {
    result.data = e;
    result.code = 500;
  }
  return result;
}

export async function deleteDoc(filter) {
  let result = {
    code: 200,
    data: null,
  }
  try {
    result.data = await accountCollection.deleteOne(filter);
  } catch (e) {
    result.data = e;
    result.code = 500;
  }
  return result;
}

export async function deleteMany(filter) {
  let result = {
    code: 200,
    data: null,
  }
  try {
    result.data = await accountCollection.deleteMany(filter);
  } catch (e) {
    result.data = e;
    result.code = 500;
  }
  return result;
}

export async function getAccountBalance(id) {
  // get all transactions 
  const transactions = findAllTransactions(id);

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

export async function checkPermissions({ response, config, requestingUser, requestedAccount }) {

  if (typeof requestingUser == "undefined" || requestingUser == null) {
    APIError.db(response);
    return false;
  }
  if (typeof requestedAccount == "undefined" || requestedAccount == null) {
    APIError.db(response);
    return false;
  }
  for (let i = 0; i < config.length; i++) {
    const test = config[i];
    const result = await test(requestingUser, requestedAccount);
    if (result == true) {
      return true;
    }
  }
  APIError.db(response);
  return false;
}