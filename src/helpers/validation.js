const hasInput = (val) => val.length > 0;
const isPositive = (val) => val.toString().search(/^-/) === -1;
const isNumber = (val) => val.toString().search(/^(\d{1,3}){0,1}(,\d\d\d){0,}((\.)((\d){0,2})){0,1}$/) > -1;
const hasTwoSigFigs = (val) => val.toString().search(/\.(\d){3,}/) === -1;
const isLessThanBalance = (val, balance) => Number(val.replaceAll(',','')) <= balance ||  val.toString().search(/^(\d{1,3}){0,1}(,\d\d\d){0,}((\.)((\d){0,2})){0,1}$/)  === -1;

const validationFunctions = {hasInput, isPositive, isNumber, hasTwoSigFigs, isLessThanBalance};

export default validationFunctions