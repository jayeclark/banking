import { useContext, useState } from 'react';
import { now } from 'lodash';
import formParser from '../helpers/formParser';
import { getUser, parseNumber, parseValidation } from '../helpers/library';
import validationFunctions from '../helpers/validation';
import Card from '../components/Card';
import UserDBContext from '../helpers/UserDBContext';
import FormContext from '../helpers/FormContext';
import UserContext from '../helpers/UserContext';
import LanguageContext from '../helpers/LanguageContext';
import languages from '../data/languages.js';

function Withdraw() {

    // Get user database, logged in user, form provider, and language
    const userDBContext = useContext(UserDBContext);
    const { loggedInUser } = useContext(UserContext);
    const { form: formProvider } = useContext(FormContext);
    const { language } = useContext(LanguageContext);

    // Get logged in user number, determine starting balance, and set local balance state
    const startingBalance = loggedInUser ? getUser(userDBContext,loggedInUser).balance : 0.00;
    const [balance, setBalance] = useState(startingBalance);

    // Load page content
    const pageName = "withdraw";
    const { header, card: {cardMsg, balanceMsg }, id, valueIfNoData, valueIfNotLoggedIn} = languages[language].pages[pageName];
    const { formSubmission, formFields } = languages[language].forms[pageName];
    const content = <><span className="card-content">{cardMsg}</span><h4 className="card-balance-msg">{ balanceMsg }{ balance.toFixed(2) }</h4></>;

    // Parse validation functions
    const availableArgs = { balance };
    parseValidation(formFields, validationFunctions, availableArgs);

    // Add submission instructions
    const submitHelperFunc = (values) => {

            if (loggedInUser === '') {return 'failure'}
            else {
                let newBalance = balance - parseNumber(values.withdraw, 2);
                if (isNaN(newBalance)) {return 'failure'};
                setBalance(newBalance);
                getUser(userDBContext,loggedInUser).balance = newBalance;
                getUser(userDBContext,loggedInUser).transactions.push({ time: now(), 
                                                                        credit: null, 
                                                                        debit: parseNumber(values.withdraw, 2), 
                                                                        description: formSubmission.typeOfAction, 
                                                                        newBalance
                                                                      })
                return 'success';
            }
    
        }
    formSubmission.submitHelper = submitHelperFunc;

    // Create form component
    const form = formParser(formProvider, formFields, formSubmission);

    return (
            <>
            {   loggedInUser !== '' && balance > 0 ? <Card id={ id } header={ header } content={ content } form={ form }></Card> :
                loggedInUser !== ''  ? <Card id={ id } header={ header } content={ <><p>{ valueIfNoData }</p><h4>{ balanceMsg }{ balance.toFixed(2) }</h4></> } form=""></Card> : 
                                       <Card id={ id } header={ header } content={ <p>{ valueIfNotLoggedIn }</p> } form=""></Card> }
            </>
    )

}

export default Withdraw;