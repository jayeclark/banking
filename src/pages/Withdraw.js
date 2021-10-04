import Card from '../components/Card';
import {useContext, useState} from 'react';
import UserDBContext from '../helpers/UserDBContext';
import FormContext from '../helpers/FormContext';
import UserContext from '../helpers/UserContext';
import LanguageContext from '../helpers/LanguageContext';
import { now } from 'lodash';
import formParser from '../helpers/formParser';
import validationFunctions from '../helpers/validation';
import { getUser, parseValidation } from '../helpers/library';
import languages from '../data/languages.js';

function Withdraw() {

    // Get user database
    const userDBContext = useContext(UserDBContext);

    // Get logged in user number, determine starting balance, and set balance state
    const {loggedInUser} = useContext(UserContext);
    const startingBalance = loggedInUser ? getUser(userDBContext,loggedInUser).balance : 0.00;
    const [balance, setBalance] = useState(startingBalance);

    // Get form preference
    const {form: formProvider} = useContext(FormContext);

    // Get language preference and import content data based on it
    const {language} = useContext(LanguageContext);
    const data = languages[language];
    
    // Load page content
    const {header, card: {cardMsg, balanceMsg}, id} = data.pages.withdraw;
    const {formSubmission, formFields, valueIfNoData, valueIfNotLoggedIn} = data.forms.withdraw;
    const content = <><p style={{padding:'20px 40px'}}>{cardMsg}</p><h4 style={{textAlign: 'right',padding: '0px 40px'}}>{balanceMsg}{balance.toFixed(2)}</h4></>;

    // Parse validation functions
    const availableArgs = {balance};
    parseValidation(formFields, validationFunctions, availableArgs);

    // Add submission instructions
    const submitHelperFunc = (values) => {

            if (loggedInUser === '') {return 'failure'}
            else {
                let newBalance = balance - Number(values.withdraw.replace(',',''));
                if (isNaN(newBalance)) {return 'failure'};
                setBalance(newBalance);
                getUser(userDBContext,loggedInUser).balance = newBalance;
                getUser(userDBContext,loggedInUser).transactions.push({time: now(), credit: null, debit: Number(values.withdraw.replace(',','')), description: formSubmission.typeOfAction, newBalance: balance - Number(Number(values.withdraw.replace(',','')).toFixed(2)) })
                return 'success';
            }
    
        }

    formSubmission.submitHelper = submitHelperFunc;

    // Create form component
    const form = formParser(formProvider, formFields, formSubmission);

    return (
            <>
            { loggedInUser !== '' && balance > 0 ? <Card id={id} header={header} content={content} form={form}></Card> :
                    loggedInUser !== ''  ? 
                    <Card id={id} header={header} content={<><p>{valueIfNoData}</p><h4>{balanceMsg}{balance.toFixed(2)}</h4></>} form=""></Card> : 
                    <Card id={id} header={header} content={<p>{valueIfNotLoggedIn}</p>} form=""></Card> 
            }
            </>
    )

}

export default Withdraw;