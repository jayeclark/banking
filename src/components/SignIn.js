import React from 'react';
import { useContext } from 'react';
import { parseValidation } from '../helpers/library';
import validationFunctions from '../helpers/validation';
import formParser from '../helpers/formParser';
import Card from '../components/Card';
import FormContext from '../helpers/FormContext';
import LanguageContext from '../helpers/LanguageContext';
import NotificationContext from '../helpers/NotificationContext';
import UserContext from '../helpers/UserContext';
import UserDBContext from '../helpers/UserDBContext';
import languages from '../data/languages.js';

export function SignIn() {

        // Get user database, logged in user, form preference, and language
        const { users } = useContext(UserDBContext);
        const { logIn } = useContext(UserContext);
        const { form: formProvider } = useContext(FormContext);
        const { language } = useContext(LanguageContext);
        const { displayNotification } = useContext(NotificationContext);
    
        // Load page content
        const { formSubmission, formFields } = languages[language].forms['signIn'];
        const content = <span className="card-content"></span>;
     
        const { success, failure } = formSubmission;
        const { successTitle, failureTitle, signInHeader } = languages[language].general;

        // Parse validation functions
        parseValidation(formFields, validationFunctions);
    
        // Add submission instructions
        const submitHelperFunc = (values) => {
    
            const user = {
                email: values.email,
                password: values.password,
             };
    
            let usersWithSameEmail = users.filter(user => user.email === values.email);
            
            if (usersWithSameEmail.length === 0) { 
                displayNotification({ title: failureTitle, type: 'failure', text: failure, time: 5000 });
                return 'failure'; }
            else {
                let matchingUser = usersWithSameEmail[0];
                let userPwd = matchingUser.password;
                if (userPwd !== user.password) {
                    displayNotification({ title: failureTitle, type: 'failure', text: failure, time: 5000 });
                    return 'failure';
                }
                else {
                    logIn(matchingUser.number);
                    displayNotification({ title: successTitle, type: 'success', text: success, time: 5000 });
                    return 'success';
                }

            }
    
        }
        formSubmission.submitHelper = submitHelperFunc;
    
        // Create form component
        const form = formParser(formProvider, formFields, formSubmission);
    
        return (
            <Card id="sign-in-card" header={signInHeader} content={content} form={form}></Card>
        )
    


}