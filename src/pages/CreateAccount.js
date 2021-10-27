import React from 'react';
import { useContext } from 'react';
import { getUserCount, parseValidation } from '../helpers/library';
import validationFunctions from '../helpers/validation';
import formParser from '../helpers/formParser';
import { now } from 'lodash';
import Card from '../components/Card';
import FormContext from '../helpers/FormContext';
import LanguageContext from '../helpers/LanguageContext';
import NotificationContext from '../helpers/NotificationContext';
import UserContext from '../helpers/UserContext';
import UserDBContext from '../helpers/UserDBContext';
import languages from '../data/languages.js';

function CreateAccount() {

    // Get user database, logged in user, form preference, and language
    const { users, addUser } = useContext(UserDBContext);
    const { logIn } = useContext(UserContext);
    const { form: formProvider } = useContext(FormContext);
    const { language } = useContext(LanguageContext);
    const { displayNotification } = useContext(NotificationContext);

    // Load page content
    const pageName = 'createAccount';
    const { header, card: {cardMsg}, id } = languages[language].pages[pageName];
    const { formSubmission, formFields } = languages[language].forms[pageName];
    const content = <span className="card-content">{ cardMsg }</span>;

    // Get notification content
    const { success, failure } = formSubmission;
    const { successTitle, failureTitle } = languages[language].general;

    // Parse validation functions
    parseValidation(formFields, validationFunctions);

    // Add submission instructions
    const submitHelperFunc = (values) => {

        const user = {
            name: values.name,
            email: values.email,
            password: values.password,
            transactions: [],
            balance: 0,
            time: now(),
            number: getUserCount(users) + 1,
         };

        let usersWithSameEmail = users.filter(user => user.email === values.email);
        
        if (usersWithSameEmail.length > 0) { 
            displayNotification({ title: failureTitle, type: 'failure', text: failure, time: 5000 });
            return 'failure'; 
        }
        else {
            addUser(user);
            logIn(user.number);
            displayNotification({ title: successTitle, type: 'success', text: success, time: 5000 });
            return 'success';
        }

    }
    formSubmission.submitHelper = submitHelperFunc;

    // Create form component
    const form = formParser(formProvider, formFields, formSubmission);

    return (
        <Card id={id} header={header} content={content} form={form}></Card>
    )

}

export default CreateAccount;