import { fromCamelCase } from "./formatting.js";
import { findDoc as findUser } from "../user.js";
import { findDoc as findCustomer } from "../customer.js";
import { findDoc as findAccount } from "../account.js";
import { findDoc as findTransaction } from "../transaction.js";

const findDoc = {
  user: findUser,
  customer: findCustomer,
  account: findAccount,
  transaction: findTransaction
};

export const checkRequiredFields = (required, instance, resultsArray) => {
  required.forEach(property => {
    if (instance[property] == null || typeof instance[property] == "undefined") {
      resultsArray.push({
        field: fromCamelCase(property),
        message: "No data provided"
      })
    }
  })
}

export const checkRequiredArrays = (required, instance, resultsArray) => {
  required.forEach(property => {
    if (instance[property].length == 0 || typeof instance[property] == "undefined" || instance[property].length == 0) {
      resultsArray.push({
        field: fromCamelCase(property),
        message: "No value provided to array."
      })
    }
  })
}

export const checkPermissions = async ({ type, validators, requesting, requestedID }) => {

  if (typeof requesting == "undefined"
    || requesting == null
    || typeof requestedID == "undefined"
    || requestedID == null)
  {
    return false;
  }

  const requested = await getRequestedRecord(requestedID, type);
  if (typeof requested == "undefined" || requested == null) {
    return false;
  }
  // Return true if the requesting user meets any of the validator rules
  for (let i = 0; i < validators.length; i++) {
    const test = validators[i];
    const result = await test(requesting, requested);
    if (result == true) {
      return true;
    }
  }
  return false;
};

export async function getRequestedRecord(requestedID, recordType) {
  let requestedRecord;
  try {
    const find = findDoc[recordType];
    const result = await find({ id: requestedID });
    requestedRecord = await result.data;
  } catch (e) {
    console.log(e);
  }
  return requestedRecord;
}