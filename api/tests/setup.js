const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  initialUserData: {
    username: Date.now(),
    firstName: "Test",
    middleName: "Ish",
    lastName: "Person",
    birthDate: "1980-02-10",
    primaryEmail: 0,
    primaryPhone: 0,
    primaryAddress: 0,
    email: ["me@me.com"],
    phone: ["617 555 5555"],
    address: ['1234 Street City State 00000'],
    password: process.env.TEST_PASSWORD,
  },
  initialAccountData: {
    nickname: "Test Account",
    type: "Checking",
  },
  initialTransactionData: {
    amount: 1000,
    type: "debit",
    decimalConversion: 100,
    currency: "USD",
    initiatedTime: Date.now(),
    completedTime: Date.now(),
    status: "completed",
  }
} 
