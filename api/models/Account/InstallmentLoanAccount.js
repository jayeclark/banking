import { checkRequiredFields } from "../../services/helpers/validation.js";
import Account from "./index.js";
class InstallmentLoanAccount extends Account {
  static required = ["interestAccrualStarts, paymentsStart, totalPayments, paymentPeriod"];

  constructor(props) {
    super(props);
    this.interestAccrualStarts = props.interestAccrualStarts;
    this.paymentsStart = props.paymentsStart;
    this.totalPayments = props.totalPayments;
    this.paymentPeriod = props.paymentPeriod;
  }

  isValidAccount() {
    if (!this.interestAccrualStarts || !this.paymentsStart || !this.totalPayments || props.paymentPeriod) {
      return false;
    }
    return this.isValid();
  }

  missingAccountData() {
    const initialMissingData = this.missingData();
    checkRequiredFields(InstallmentLoanAccount.required, this, initialMissingData);
    return initialMissingData;
  }
}

export default InstallmentLoanAccount;