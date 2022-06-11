import { checkRequiredFields, checkRequiredArrays } from "../../services/helpers/validation.js";
class Account {
  static required = ["id", "type", "customerID", "checksum", "authedUsers"];
  static requiredArrays = ["authedUsers"];
  
  constructor(props) {
    this._id = props._id;
    this.id = props.id;
    this.nickname = props.nickname;
    this.type = props.type;
    this.interestRate = props.interestRate || 0;
    this.createdTime = props.createdTime;
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
    for (let i = 0; i < this.required.length; i++) {
      const property = this.required[i];
      if (this[property] == null || typeof this[property] == undefined) {
        return false;
      }
    }
    return true;
  }

  missingData() {
    const missingData = [];
    checkRequiredFields(this.required, this, missingData);
    checkRequiredArrays(this.requiredArrays, this, missingData);
    return missingData;
  }
}

export default Account;