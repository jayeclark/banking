import { useContext } from 'react';
import { parseValidation } from '../helpers/library';
import validationFunctions from '../helpers/validation';
import formParser from '../helpers/formParser';
import Card from '../components/Card';
import FormContext from '../helpers/FormContext';
import LanguageContext from '../helpers/LanguageContext';
import UserContext from '../helpers/UserContext';
import UserDBContext from '../helpers/UserDBContext';
import languages from '../data/languages.js';

export function SignIn() {

        // Get user database, logged in user, form preference, and language
        const { users } = useContext(UserDBContext);
        const { logIn } = useContext(UserContext);
        const { form: formProvider } = useContext(FormContext);
        const { language } = useContext(LanguageContext);
    
        // Load page content
        const { formSubmission, formFields } = languages[language].forms['signIn'];
        const content = <span className="card-content"></span>;
     
        // Parse validation functions
        parseValidation(formFields, validationFunctions);
    
        // Add submission instructions
        const submitHelperFunc = (values) => {
    
            const user = {
                email: values.email,
                password: values.password,
             };
    
            let usersWithSameEmail = users.filter(user => user.email === values.email);
            
            if (usersWithSameEmail.length === 0) { return 'failure'; }
            else {
                let matchingUser = usersWithSameEmail[0];
                let userPwd = matchingUser.password;
                if (userPwd !== user.password) {
                    return 'failure';
                }
                else {
                    logIn(matchingUser.number);
                    return 'success';
                }
                return 'failure';
            }
    
        }
        formSubmission.submitHelper = submitHelperFunc;
    
        // Create form component
        const form = formParser(formProvider, formFields, formSubmission);
    
        return (
            <Card id="sign-in-card" header="Sign In to Your Account" content={content} form={form}></Card>
        )
    


}