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

function Deposit() {

    // Get user database
    const userDBContext = useContext(UserDBContext);

    // Get logged in user number, determine starting balance, and set balance
    const {loggedInUser} = useContext(UserContext);
    const startingBalance = loggedInUser ? getUser(userDBContext,loggedInUser).balance : 0.00;
    const [balance, setBalance] = useState(startingBalance);

    // Get form preference
    const {form: formProvider} = useContext(FormContext);

    // Get language preference and import content data based on it
    const {language} = useContext(LanguageContext);
    const data = languages[language];
    
    // Load page content
    const {header, card: {cardMsg, balanceMsg}, id, valueIfNotLoggedIn} = data.pages.deposit;
    const {formSubmission, formFields} = data.forms.deposit;
    const content = <><p style={{padding:'20px 40px'}}>{cardMsg}</p><h4 style={{textAlign: 'right',padding:'0px 40px'}}>{balanceMsg}{balance.toFixed(2)}</h4></>;

    // Parse validation functions
    parseValidation(formFields, validationFunctions);
 
    // Add submission instructions
    const submitHelperFunc = (values) => {

            if (loggedInUser === null) {return 'failure'}
            else {
                let newBalance = balance + Number(values.deposit.replace(',',''));
                if (isNaN(newBalance)) {return 'failure'};
                setBalance(newBalance);
                getUser(userDBContext,loggedInUser).balance = newBalance;
                getUser(userDBContext,loggedInUser).transactions.push({time: now(), credit: Number(values.deposit.replace(',','')), debit: null, description: formSubmission.typeOfAction, newBalance: balance + Number(Number(values.deposit.replace(',','')).toFixed(2)) })
                return 'success';
            }
    
        }
    formSubmission.submitHelper = submitHelperFunc;

    // Create form component
    const form = formParser(formProvider, formFields, formSubmission);

    return (
            <>
            {loggedInUser ? <Card id={id} header={header} content={content} form={form}></Card> :
                    <Card id={id} header={header} content={valueIfNotLoggedIn} form=""></Card> }
            </>
    )

}

export default Deposit;