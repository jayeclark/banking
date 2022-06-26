import Transaction from '../models/Transaction.js';
import { addDoc, findDoc, updateDoc, deleteDoc } from "../services/transaction.js";
import APIError from '../services/helpers/error.js';
import { checkAuthStatus, accountStatus, transactionStatus } from "../services/helpers/auth.js";

async function create(request, response) {
  // Check auth status
  const config = {
    type: "account",
    id: request.body.accountID,
    validators: [accountStatus.isAdmin, accountStatus.isSuperAdmin]
  }
  const authIssue = await checkAuthStatus(request, config);
  if (authIssue) { APIError[authIssue](response); return; }

  // Throw an error if the data provided was not correct/complete
  const transaction = new Transaction(request.body);

  if (!transaction.isValid()) {
    APIError.missingData(response, transaction.missingData());
    return;
  }

  let addResult;
  try {
    addResult = await addDoc(transaction);
  } catch (e) {
    console.error(e);
    APIError.db(response);
    return;
  }

  response.status(addResult.code).json({ ...addResult.data, transaction });
  return;  
}

async function read(request, response) {
  // Check auth status
  const config = {
    type: "transaction",
    id: request.query.id,
    validators: [transactionStatus.isAdmin, transactionStatus.isSuperAdmin]
  }
  const authIssue = await checkAuthStatus(request, config);
  if (authIssue) { APIError[authIssue](response); return; }

  let requestedTransaction;
  try {
    requestedTransaction = await findDoc({ id: request.query.id });
  } catch (e) {
    console.error(e);
    APIError.db(response);
    return;
  }

  response.status(requestedTransaction.code).json(requestedTransaction.data);
  return;    
}

async function readAll(request, response) {
  // Check auth status
  const config = {
    type: "account",
    id: request.query.id,
    validators: [accountStatus.isAdmin, accountStatus.isSuperAdmin]
  }
  const authIssue = await checkAuthStatus(request, config);
  if (authIssue) { APIError[authIssue](response); return; }

  let requestedTransactions;
  try {
    requestedTransactions = await findAll({ accountID: request.query.id });
  } catch (e) {
    console.error(e);
    APIError.db(response);
    return;
  }

  response.status(requestedTransactions.code).json(requestedTransactions.data);
  return;    
}

async function update(request, response) {
  // Check auth status
  const config = {
    type: "transaction",
    id: request.body.id,
    validators: [transactionStatus.isAdmin, transactionStatus.isSuperAdmin]
  }
  const authIssue = await checkAuthStatus(request, config);
  if (authIssue) { APIError[authIssue](response); return; }

  let updateResult;
  try {
    const updates = {
      $set: { ...request.body.updates }
    }
    updateResult = await updateDoc({ id: request.query.id }, updates);
  } catch (e) {
    console.error(e);
    APIError.db(response);
    return;
  }

  response.status(updateResult.code).json(updateResult.data);
  return;     
}

async function del(request, response) {
  // Check auth status
  const config = {
    type: "transaction",
    id: request.body.id,
    validators: [transactionStatus.isAdmin, transactionStatus.isSuperAdmin]
  }
  const authIssue = await checkAuthStatus(request, config);
  if (authIssue) { APIError[authIssue](response); return; }

  let deleteResult;
  try {
    deleteResult = await deleteDoc({ id: request.query.id });
  } catch (e) {
    console.error(e);
    APIError.db(response);
    return;
  }

  response.status(deleteResult.code).json(deleteResult.data);
  return;   
}

const controller = { create, read, readAll, update, del };
export default controller;