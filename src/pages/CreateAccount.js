import FormFormik from '../components/FormFormik';
import FormReactFinal from '../components/FormReactFinal';
import FormReactHook from '../components/FormReactHook';
import Card from '../components/Card';


function CreateAccount() {

    const formProvider = 'formik';

    const valLength = val => val.length > 0;
    const regex = new RegExp('^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$');
    const emailFormat = email => regex.test(email);
    const passwordLength = val => val.length > 0;

    const formFields = 
        [{  name: 'name',
            display: 'Name',
            validation: [{function: valLength, error: 'Please enter your name'} ],
            idRoot: 'create-account',
            },
            {
            name: 'email',
            display: 'Email',
            validation: [{function: valLength, error: 'Please enter your email address'},
                        {function: emailFormat, error: 'Please enter a valid email address'}]
            },
            {
                name: 'password',
                display: 'Password',
                validation: [{function: passwordLength, error: 'Password must be 8 characters or longer'}]
                }
        ]

    const formSubmission = {buttons:[{type:'submit',name:'submit',display:'Submit Account'}],
                            success: 'Your account has been created!',
                            failure: 'There was a problem creating your account. Please contact the help desk for support.',
                            }


    const header = "Create a New Account";
    const content = <p>Enter your name, email, and password and click submit to create a new account!</p>;
    let form = '';


    switch (formProvider) {

        case 'formik':
            form = <FormFormik formFields={formFields} formSubmission={formSubmission}></FormFormik> ;
            break;

        case 'reactFinal':
            form = <FormReactFinal formFields={formFields} formSubmission={formSubmission}></FormReactFinal>;
            break;

        case 'reactHook':
            form = <FormReactHook formFields={formFields} formSubmission={formSubmission}></FormReactHook>;
            break;
        
        default:
            form = <FormFormik formFields={formFields} formSubmission={formSubmission}></FormFormik>;
    }

    return (
        <Card header={header} content={content} form={form}></Card>
    )

}

export default CreateAccount;