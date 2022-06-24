import { nanoid } from "nanoid";
import { fromCamelCase } from "../services/helpers/formatting.js";
class Transaction {
  static required = ["accountID", "customerID", "userID", "amount", "type", "initiatedTime"];
  static types = ["debit", "credit"];

  constructor(props) {
    this._id = props._id;
    this.id = props.accountID + "-" + Date.now() + "-" + nanoid(4);
    this.amount = props.amount;
    this.type = props.type;
    this.decimalConversion = props.base || 100;
    this.currency = props.currency;
    this.initiatedTime = props.initiatedTime || Date.now();
    this.completedTime = props.completedTime;
    this.status = props.status || "processing";
    this.syncToken = 1;
    this.log = [];
    this.accountID = props.accountID;
    this.customerID = props.customerID;
    this.userID = props.userID;
  }

  isValid() {
    for (let i = 0; i < Transaction.required.length; i++) {
      const property = Transaction.required[i];
      if (this[property] == null || typeof this[property] == "undefined") {
        return false;
      }
    }
    if (this.type && !Transaction.types.includes(this.type)) {
      return false;
    }
    if (this.amount <= 0) {
      return false;
    }
    return true;
  }

  missingData() {
    const missingData = [];
    for (let i = 0; i < Transaction.required.length; i++) {
      const property = Transaction.required[i];
      if (this[property] == null || typeof this[property] == "undefined") {
        missingData.push({
            field: fromCamelCase(property),
            message: "No data provided."
          })
      }
    }
    if (this.type && !Transaction.types.includes(this.type)) {
      missingData.push({
          field: "Type",
          message: "Incorrect transaction type provided."
        })
    }
    if (this.amount <= 0) {
      missingData.push({
          field: "Amount",
          message: "Incorrect transaction amount provided."
      })
    }
    return missingData;
  }
}

export default Transaction;