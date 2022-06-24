const axios = require("axios");

async function createUser(data) {
  let result;
  try {
    result = await axios.post("http://localhost:8080/api/auth/register", { ...data }, {});
  } catch (e) {
    result = e.response;
  }
  return result;
}

async function getUser(data, auth) {
  let result;
  try {
    result = await axios.get(`http://localhost:8080/api/user/`, { params: data, headers: { Authorization: auth } });
  } catch (e) {
    result = e.response;
  }
  return result;
}

async function updateUser(data, auth) {
  let result;
  try {
    result = await axios.put(`http://localhost:8080/api/user/`, data, { headers: { Authorization: auth } });
  } catch (e) {
    result = e.response;
  }
  return result;
}

async function deleteUser(data, auth) {
  let result;
  try {
    result = await axios.delete("http://localhost:8080/api/user/", { data, headers: { Authorization: auth } });
  } catch (e) {
    result = e.response;
  }
  return result;
}

async function getCustomer(data, auth) {
  let result;
  try {
    result = await axios.get(`http://localhost:8080/api/customer/`, { params: data, headers: { Authorization: auth } });
  } catch (e) {
    result = e.response;
  }
  return result;
}

async function createAccount(data, auth) {
  let result;
  try {
    result = await axios.post("http://localhost:8080/api/account/", { ...data }, {headers: { Authorization: auth } });
  } catch (e) {
    result = e.response;
  }
  return result;
}

async function getAccount(data, auth) {
  
  let result;
  try {
    result = await axios.get(`http://localhost:8080/api/account/`, { params: data, headers: { Authorization: auth } });
  } catch (e) {
    result = e.response;
  }
  return result;
}

async function updateAccount(data, auth) {
  
  let result;
  try {
    result = await axios.put(`http://localhost:8080/api/account/`, data, { headers: { Authorization: auth } });
  } catch (e) {
    result = e.response;
  }
  return result;
}

async function deleteAccount(data, auth) {
  let result;
  try {
    result = await axios.delete("http://localhost:8080/api/account/", { data, headers: { Authorization: auth } });
  } catch (e) {
    result = e.response;
  }
  return result;
}

async function createTransaction(data, auth) {
  let result;
  try {
    result = await axios.post("http://localhost:8080/api/transaction/", data, { headers: { Authorization: auth } });
  } catch (e) {
    result = e.response;
  }
  return result;
}

async function getTransaction(data, auth) {
  
  let result;
  try {
    result = await axios.get(`http://localhost:8080/api/transaction/`, { params: data, headers: { Authorization: auth } });
  } catch (e) {
    result = e.response;
  }
  return result;
}

async function getTransactions(data, auth) {
  
  let result;
  try {
    result = await axios.get(`http://localhost:8080/api/transaction/all/`, { params: data, headers: { Authorization: auth } });
  } catch (e) {
    result = e.response;
  }
  return result;
}

async function updateTransaction(data, auth) {
  
  let result;
  try {
    result = await axios.put(`http://localhost:8080/api/transaction/`, data, { headers: { Authorization: auth } });
  } catch (e) {
    result = e.response;
  }
  return result;
}

async function deleteTransaction(data, auth) {
  let result;
  try {
    result = await axios.delete("http://localhost:8080/api/transaction/", { data, headers: { Authorization: auth } });
  } catch (e) {
    result = e.response;
  }
  return result;
}

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getCustomer,
  createAccount,
  getAccount,
  updateAccount,
  deleteAccount,
  createTransaction,
  getTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction
}