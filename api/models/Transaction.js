class Transaction {
  constructor(props) {
    this._id = props._id;
    this.id = props.id;
    this.amount = props.amount;
    this.type = props.type;
    this.decimalConversion = props.base || 100;
    this.currency = props.currency;
    this.initiatedTime = props.initiatedTime;
    this.completedTime = props.completedTime;
    this.status = props.status;
    this.syncToken = 1;
    this.log = [];
    this.accountID = props.accountID;
    this.userID = props.userID;
  }
}

export default Transaction;