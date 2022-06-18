import { checkRequiredFields } from "../../services/helpers/validation.js";
import Account from "./index.js";

class CheckingAccount extends Account {
  static required = ["onlineOnly"];

  constructor(props) {
    super(props);
    this.onlineOnly = props.onlineOnly || false;
  }

  isValidAccount() {
    return this.isValid() && this.onlineOnly !== null && typeof this.onlineOnly !== "undefined";
  }

  missingAccountData() {
    const initialMissingData = this.missingData();
    checkRequiredFields(CheckingAccount.required, this, initialMissingData);
    return initialMissingData;
  }
}

export default CheckingAccount;