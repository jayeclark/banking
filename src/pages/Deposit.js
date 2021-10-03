import FormFormik from '../components/FormFormik';
import FormReactFinal from '../components/FormReactFinal';
import FormReactHook from '../components/FormReactHook';
import Card from '../components/Card';
import {useContext, useState} from 'react';
import UserDBContext from '../helpers/UserDBContext';
import FormContext from '../helpers/FormContext';
import UserContext from '../helpers/UserContext';
import { now } from 'lodash';

function Deposit() {

    const userDBContext = useContext(UserDBContext);
    console.log(useContext(UserContext));
    const {loggedInUser} = useContext(UserContext);

    const getUser = (userDBObj, userNum) => {
        const users = userDBObj.users;
        let user =  userNum !== null ? users.filter(x=>x.number === userNum)[0] :   
                    users.length > 0 ? users[0] : null
        return user;
    }

    const formObj = useContext(FormContext);
    const formProvider = formObj.form;
    const startingBalance = loggedInUser ? getUser(userDBContext,loggedInUser).balance : 0.00;
    const [balance, setBalance] = useState(startingBalance);

    const header = "Make a Deposit";
    const content = <><p>Enter an amount and click submit to make a deposit to your account!</p><h4>Current Balance: ${balance.toFixed(2)}</h4></>;
    let form = '';

    const valLength = (val) => val.length > 0;
    const valPositive = (val) => val.toString().search(/^-/) === -1;
    const typeCheck = (val) => val.toString().search(/[0-9.,-]/) > -1 && val.toString().search(/[^0-9.,-]/) === -1;
    const decimalCheck = (val) => val.toString().search(/(\.){2,}/) === -1 && val.toString().search(/\.(.){3,}/) === -1;

    const formFields = [{
                            name: 'deposit',
                            display: 'Amount ($)',
                            type: 'text',
                            validation: [{function: valLength, error: 'Please enter an amount to deposit'},
                                         {function: valPositive, error: 'Please enter a positive amount'},
                                         {function: typeCheck, error: 'Please enter a positive number, with no currency symbol'},
                                         {function: decimalCheck, error: 'Please only enter 2 decimal points'}  ],
                        }];

    const submitHelperFunc = (values) => {

            if (loggedInUser === null) {return 'failure'}
            else {
                let newBalance = balance + Number(values.deposit.replace(',',''));
                if (isNaN(newBalance)) {return 'failure'};
                setBalance(newBalance);
                getUser(userDBContext,loggedInUser).balance = newBalance;
                getUser(userDBContext,loggedInUser).transactions.push({time: now(), credit: Number(values.deposit.replace(',','')), debit: null, description: 'Deposit to account', newBalance: balance + Number(Number(values.deposit.replace(',','')).toFixed(2)) })
                return 'success';
            }
    
        }
    const depositCreated = false;

    const formSubmission = {buttons:[{type:'submit',name:'submit',display:'Deposit', altDisplay: 'Deposit', dependency: () => false, className:'btn btn-primary'}],
                            submitHelper: submitHelperFunc,
                            success: 'Your deposit has been recorded!',
                            failure: 'We were unable to make a deposit. Please try again later.',
                            idRoot: 'deposit',
                            accountCreated: depositCreated,
                            };

    switch (formProvider) {

        case 'formik':
            form = <FormFormik 
                        formFields={formFields} 
                        formSubmission={formSubmission} 
                        accountCreated={depositCreated} >
                    </FormFormik> ;
            break;

        case 'reactFinal':
            form = <FormReactFinal 
                        formFields={formFields} 
                        formSubmission={formSubmission} 
                        accountCreated={depositCreated} >
                    </FormReactFinal>;
            break;

        case 'reactHook':
            form = <FormReactHook 
                        formFields={formFields} 
                        formSubmission={formSubmission} 
                        accountCreated={depositCreated} >
                    </FormReactHook>;
            break;
        
        default:
            form = <FormFormik 
                        formFields={formFields} 
                        formSubmission={formSubmission} 
                        accountCreated={depositCreated} >
                    </FormFormik>;
    }


    return (
            <>
            {loggedInUser ? <Card header={header} content={content} form={form}></Card> :
                    <Card header={header} content="You must be logged in to make a deposit!" form=""></Card> }
            </>
    )

}

export default Deposit;