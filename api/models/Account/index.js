import { checkRequiredFields, checkRequiredArrays } from "../../services/helpers/validation.js";
import { nanoid } from "nanoid";
class Account {
  static required = ["id", "type", "customerID", "checkSum"];
  static requiredArrays = ["authedUsers"];
  
  constructor(props) {
    this._id = props._id;
    this.id = nanoid(15);
    this.nickname = props.nickname;
    this.type = props.type;
    this.interestRate = props.interestRate || 0;
    this.createdTime = Date.now();
    this.interestRateHistory = [{
      start: this.createdTime,
      end: null,
      rate: this.interestRate,
    }];
    this.monthlyFee = props.monthlyFee || 0;
    this.monthlyFeeHistory = [{
      start: this.createdTime,
      end: null,
      rate: this.monthlyFee,
    }];
    this.customerID = props.customerID;
    this.authedUsers = [...props.authedUsers];
    this.checkSum = props.checkSum;
  }

  isValid() {
    for (let i = 0; i < Account.required.length; i++) {
      const property = Account.required[i];
      if (this[property] == null || typeof this[property] == undefined) {
        return false;
      }
    }
    for (let i = 0; i < Account.requiredArrays.length; i++) {
      const property = Account.required[i];
      if (this[property] == null || typeof this[property] == undefined || this[property].length == 0) {
        return false;
      }
    }
    return true;
  }

  missingData() {
    const missingData = [];
    checkRequiredFields(Account.required, this, missingData);
    checkRequiredArrays(Account.requiredArrays, this, missingData);
    return missingData;
  }
}

export default Account;