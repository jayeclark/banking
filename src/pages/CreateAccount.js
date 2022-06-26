import React from 'react';
import { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { parseValidation } from '../helpers/library';
import validationFunctions from '../helpers/validation';
import formParser from '../helpers/formParser';
import { API_URL } from '../helpers/constants';
import axios from 'axios';
import Card from '../components/Card';
import FormContext from '../helpers/FormContext';
import LanguageContext from '../helpers/LanguageContext';
import NotificationContext from '../helpers/NotificationContext';
import UserContext from '../helpers/UserContext';
import UserDBContext from '../helpers/UserDBContext';
import languages from '../data/languages.js';

function CreateAccount() {

    const [loggedIn, setLoggedIn] = useState(false);
    // Get user database, logged in user, form preference, and language
    const { logIn } = useContext(UserContext);
    const { addUser } = useContext(UserDBContext);
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
    const submitHelperFunc = async (values) => {

        const user = {
            username: values.name.replaceAll(" ", "").toLowerCase(),
            firstName: values.name.split(" ")[0],
            lastName: values.name.split(" ")[values.name.split(" ").length - 1],
            birthDate: Date.parse("1990-02-01"),
            primaryEmail: 0,
            email: [values.email],
            primaryPhone: 0,
            phone: ["555-555-5555"],
            primaryAddress: 0,
            address: ["123 Fake Lane, Faketown AS 00000"],
            password: values.password,
         };

        let result = await axios.post(`${API_URL}/auth/register`, user);
        console.log(result);

        if (result.status !== 200) { 
            displayNotification({ title: failureTitle, type: 'failure', text: failure, time: 5000 });
            return 'failure'; 
        }
        else {
            console.log(result.data.user);
            addUser(result.data.user);
            logIn(result.data.user.id);
            displayNotification({ title: successTitle, type: 'success', text: success, time: 5000 });
            setLoggedIn(true);
            return 'success';
        }

    }
    formSubmission.submitHelper = submitHelperFunc;

    // Create form component
    const form = formParser(formProvider, formFields, formSubmission);

    if (loggedIn) {
    return <Redirect to='/' />
    }

    return (
        <Card id={id} header={header} content={content} form={form} style={{ margin: "30px 50px"}}></Card>
    )

}

export default CreateAccount;