import { checkRequiredFields } from "../../services/helpers/validation.js";
import Account from "./index.js";

class SavingsAccount extends Account {
  static required = ["monthlyTransactionLimit"];

  constructor(props) {
    super(props);
    this.monthlyTransactionLimit = props.monthlyTransactionLimit || 6;
  }

  isValidAccount() {
    return this.isValid() && this.monthlyTransactionLimit !== null && typeof this.monthlyTransactionLimit !== "undefined";
  }

  missingAccountData() {
    const initialMissingData = this.missingData();
    checkRequiredFields(SavingsAccount.required, this, initialMissingData);
    return initialMissingData;
  }
}

export default SavingsAccount;