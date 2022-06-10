class Account {
  constructor(props) {
    this._id = props._id;
    this.id = props.id;
    this.nickname = props.nickname;
    this.type = props.type;
    this.interestRate = props.interestRate;
    this.createdTime = props.createdTime;
    this.interestRateHistory = [{
      start: this.createdTime,
      end: null,
      rate: this.interestRate,
    }];
    this.monthlyFee = props.monthlyFee;
    this.monthlyFeeHistory = [{
      start: this.createdTime,
      end: null,
      rate: this.monthlyFee,
    }];
    this.customerID = props.customerID;
    this.checkSum = props.checkSum;
  }
}

export default Account;