import Account from "./index.js";

class InstallmentLoanAccount extends Account {
  constructor(props) {
    super(props);
    this.interestAccrualStarts = props.interestAccrualStarts;
    this.paymentsStart = props.paymentsStart;
    this.totalPayments = props.totalPayments;
    this.paymentPeriod = props.paymentPeriod;
  }
}

export default InstallmentLoanAccount;