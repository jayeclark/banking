import Account from "./index.js";

class SavingsAccount extends Account {
  constructor(props) {
    super(props);
    this.monthlyTransactionLimit = props.monthlyTransactionLimit;
  }
}

export default SavingsAccount;