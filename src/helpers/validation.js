const hasInput = (val, len=1) => val.length >= len;

const isPositive = val => val.toString().search(/^-/) === -1;

const isNumber = val => val.toString().replace(/[,.]/g,'').search(/^(\d+)$/) > -1;

const hasTwoSigFigs = val => val.toString().search(/([.]){1,}(\d){3,}/) === -1;

const isLessThanBalance = (val, balance) => Number(val.replaceAll(',','')) <= balance || !isNumber(val) ;

const isValidEmailFormat = email => {
        const emlRegex = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,'i');
        return emlRegex.test(email);
    }

const isValidPasswordFormat = pwd => {
        const pwdRegex = new RegExp(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{0,}$/,"i");
        return pwdRegex.test(pwd);
    }

const validationFunctions = { hasInput, isPositive, isNumber, hasTwoSigFigs, isLessThanBalance, isValidEmailFormat, isValidPasswordFormat };

export default validationFunctions