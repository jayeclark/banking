import { useContext, useState } from 'react';
import formParser from '../helpers/formParser';
import { getUser, parseNumber, parseValidation } from '../helpers/library';
import validationFunctions from '../helpers/validation';
import { now } from 'lodash';
import Card from '../components/Card';
import FormContext from '../helpers/FormContext';
import LanguageContext from '../helpers/LanguageContext';
import NotificationContext from '../helpers/NotificationContext';
import UserContext from '../helpers/UserContext';
import UserDBContext from '../helpers/UserDBContext';
import languages from '../data/languages.js';

function Deposit() {

    // Get user database, logged in user, form preference, and language preference
    const userDBContext = useContext(UserDBContext);
    const { loggedInUser } = useContext(UserContext);
    const { form: formProvider } = useContext(FormContext);
    const { language } = useContext(LanguageContext);
    const { displayNotification } = useContext(NotificationContext);

    // Determine starting balance, and set local component balance
    const startingBalance = loggedInUser ? getUser(userDBContext,loggedInUser).balance : 0.00;
    const [balance, setBalance] = useState(startingBalance);

    // Get page content
    const pageName = "deposit";
    const { header, card: { cardMsg, balanceMsg }, id, valueIfNotLoggedIn } = languages[language].pages[pageName];
    const { formSubmission, formFields } = languages[language].forms[pageName];
    const content = <><span className="card-content">{ cardMsg }</span><h4 className="card-balance-msg">{ balanceMsg }{ balance.toFixed(2) }</h4></>;

    // Get notification content
    const { success, failure } = formSubmission;
    const { successTitle, failureTitle } = languages[language].general;

    // Parse validation functions
    parseValidation(formFields, validationFunctions);
 
    // Add submission instructions
    const submitHelperFunc = (values) => {

            if (loggedInUser === null) {
                displayNotification({ title: failureTitle, type: 'failure', text: failure, time: 5000 });
                return 'failure';
            }
            else {
                let newBalance = balance + parseNumber(values.deposit, 2);
                if (isNaN(newBalance)) {return 'failure'};
                setBalance(newBalance);
                getUser(userDBContext,loggedInUser).balance = newBalance;
                getUser(userDBContext,loggedInUser).transactions.push(
                    {   time: now(), 
                        credit: parseNumber(values.deposit, 2), 
                        debit: null, 
                        description: formSubmission.typeOfAction, 
                        newBalance 
                    })
                displayNotification({ title: successTitle, type: 'success', text: success, time: 5000 });
                return 'success';
            }
    
        }
    formSubmission.submitHelper = submitHelperFunc;

    // Create form component
    const form = formParser(formProvider, formFields, formSubmission);

    return (
            <>
            {loggedInUser ? <Card id={id} header={header} content={content} form={form}></Card> :
                            <Card id={id} header={header} content={valueIfNotLoggedIn} form={null}></Card>}
            </>
    )

}

export default Deposit;