import Account from "./index.js";

class CheckingAccount extends Account {
  constructor(props) {
    super(props);
    this.onlineOnly = props.onlineOnly;
  }
}

export default CheckingAccount;