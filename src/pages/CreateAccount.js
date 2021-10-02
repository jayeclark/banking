import FormFormik from '../components/FormFormik';
import FormReactFinal from '../components/FormReactFinal';
import FormReactHook from '../components/FormReactHook';
import Card from '../components/Card';

function CreateAccount() {

    const accountCreated = false;

    const formProvider = 'formik';

    const valLength = val => val.length > 0;
    const nameLength = val => val.length >= 4;
    const emlRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'i');
    const pwdRegex = new RegExp(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{0,}$/,"i");
    const emailFormat = email => emlRegex.test(email);
    const passwordLength = val => val.length >= 8;
    const passwordFormat = pwd => pwdRegex.test(pwd);

    const formFields = 
        [{  name: 'name',
            display: 'Name',
            type: 'text',
            validation: [{function: valLength, error: 'Please enter your name'},
                         {function: nameLength, error: 'Name must be 4 or more characters long'}  ],
            },
            {
            name: 'email',
            type: 'text',
            display: 'Email',
            validation: [{function: valLength, error: 'Please enter your email address'},
                        {function: emailFormat, error: 'Please enter a valid email address'}]
            },
            {
            name: 'password',
            type: 'password',
            display: 'Password',
            validation: [   {function: passwordLength, error: 'Must be 8 characters or longer'},
                            {function: passwordFormat, error: 'Must include one letter, one number & one of these characters: @$!%*#?&'}
                        ]
            }
        ]

    const formSubmission = {buttons:[{type:'submit',name:'submit',display:'Create Account', altDisplay: 'Add Another Account', dependency: () => accountCreated === true, className:'btn btn-primary'}],
                            success: 'Your account has been created!',
                            failure: 'There was a problem creating your account. Please contact the help desk for support.',
                            idRoot: 'create-account',
                            }


    const header = "Create a New Account";
    const content = <p>Enter your name, email, and password and click submit to create a new account!</p>;
    let form = '';


    switch (formProvider) {

        case 'formik':
            form = <FormFormik 
                        formFields={formFields} 
                        formSubmission={formSubmission} 
                        accountCreated={accountCreated} >
                    </FormFormik> ;
            break;

        case 'reactFinal':
            form = <FormReactFinal 
                        formFields={formFields} 
                        formSubmission={formSubmission} 
                        accountCreated={accountCreated} >
                    </FormReactFinal>;
            break;

        case 'reactHook':
            form = <FormReactHook 
                        formFields={formFields} 
                        formSubmission={formSubmission} 
                        accountCreated={accountCreated} >
                    </FormReactHook>;
            break;
        
        default:
            form = <FormFormik 
                        formFields={formFields} 
                        formSubmission={formSubmission} 
                        accountCreated={accountCreated} >
                    </FormFormik>;
    }

    return (
        <Card header={header} content={content} form={form}></Card>
    )

}

export default CreateAccount;