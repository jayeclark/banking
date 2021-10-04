import Card from '../components/Card';
import {useContext} from 'react';
import UserDBContext from '../helpers/UserDBContext';
import FormContext from '../helpers/FormContext';
import UserContext from '../helpers/UserContext';
import LanguageContext from '../helpers/LanguageContext';
import formParser from '../helpers/formParser';
import validationFunctions from '../helpers/validation';
import { parseValidation } from '../helpers/library';
import languages from '../data/languages.js';

function CreateAccount() {

    // Get user database
    const {users, addUser} = useContext(UserDBContext);

    const getUserCount = (users) => users.length;

    // Get logged in user number
    const { logIn } = useContext(UserContext);

    // Get form preference
    const {form: formProvider} = useContext(FormContext);

    // Get language preference and import content data based on it
    const {language} = useContext(LanguageContext);
    const data = languages[language];

    // Load page content
    const {header, card: {cardMsg}, id} = data.pages.createAccount;
    const {formSubmission, formFields} = data.forms.createAccount;
    const content = <p style={{padding:'20px 40px'}}>{cardMsg}</p>;
 
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
            number: getUserCount(users) + 1,
         };

        let filtered = users.filter(x=>x.email === values.email);
        
        if (filtered.length > 0) {return 'failure'}
        else {
            addUser(user);
            logIn(user.number);
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