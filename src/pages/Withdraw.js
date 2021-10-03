import FormFormik from '../components/FormFormik';
import FormReactFinal from '../components/FormReactFinal';
import FormReactHook from '../components/FormReactHook';
import Card from '../components/Card';
import {useContext, useState} from 'react';
import UserDBContext from '../helpers/UserDBContext';
import FormContext from '../helpers/FormContext';
import UserContext from '../helpers/UserContext';
import { now } from 'lodash';

function Withdraw() {

    const userObj = useContext(UserDBContext);
    const loginObj = useContext(UserContext);
    const users = userObj.users;
    let user =  loginObj.loggedIn !== '' ? users.filter(x=>x.number === loginObj.loggedIn)[0] :   
                users.length > 0 ? users[0] : null
   
    const formObj = useContext(FormContext);
    const formProvider = formObj.form;
    const startingBalance = user ? user.balance : 0.00;
    const [balance, setBalance] = useState(startingBalance);

    const header = "Make a Withdrawal";
    const content = <><p>Enter an amount and click submit to make a withdrawal from your account!</p><h4>Current Balance: ${balance.toFixed(2)}</h4></>;
    let form = '';

    const valLength = (val) => val.length > 0;
    const valPositive = (val) => val.toString().search(/^-/) === -1;
    const typeCheck = (val) => val.toString().search(/[0-9.,-]/) > -1 && val.toString().search(/[^0-9.,-]/) === -1;
    const decimalCheck = (val) => val.toString().search(/(\.){2,}/) === -1 && val.toString().search(/\.(.){3,}/) === -1;
    const balCheck = (val) => Number(val.replace(',','')) <= balance || isNaN(Number(val));

    const formFields = [{
                            name: 'withdraw',
                            display: 'Amount ($)',
                            type: 'text',
                            validation: [{function: valLength, error: 'Please enter an amount to withdraw'},
                                         {function: valPositive, error: 'Please enter a positive amount to withdraw'},
                                         {function: typeCheck, error: 'Please enter a positive amount to withdraw, with no currency symbol'},
                                         {function: decimalCheck, error: 'Please only enter 2 decimal points'},
                                         {function: balCheck, error: 'Overdraw alert: Amount is more than your available balance'}]
                        }];

    const submitHelperFunc = (values) => {

            if (!user) {return 'failure'}
            else {
                let newBalance = balance - Number(values.withdraw.replace(',',''));
                if (isNaN(newBalance)) {return 'failure'};
                setBalance(newBalance);
                user.balance = newBalance;
                user.transactions.push({time: now(), credit: null, debit: Number(values.withdraw.replace(',','')), description: 'Withdrawal from account', newBalance: balance - Number(Number(values.withdraw.replace(',','')).toFixed(2)) })
                return 'success';
            }
    
        }

    const withdrawalCreated = false;

    const formSubmission = {buttons:[{type:'submit',name:'submit',display:'Submit', altDisplay: 'Submit', dependency: () => false, className:'btn btn-primary'}],
                            submitHelper: submitHelperFunc,
                            success: 'Your withdrawal has been recorded!',
                            failure: 'We were unable to make a withdrawal. Please try again later.',
                            idRoot: 'withdraw',
                            accountCreated: withdrawalCreated,
                            };

    switch (formProvider) {

        case 'formik':
            form = <FormFormik 
                        formFields={formFields} 
                        formSubmission={formSubmission} 
                        accountCreated={withdrawalCreated} >
                    </FormFormik> ;
            break;

        case 'reactFinal':
            form = <FormReactFinal 
                        formFields={formFields} 
                        formSubmission={formSubmission} 
                        accountCreated={withdrawalCreated} >
                    </FormReactFinal>;
            break;

        case 'reactHook':
            form = <FormReactHook 
                        formFields={formFields} 
                        formSubmission={formSubmission} 
                        accountCreated={withdrawalCreated} >
                    </FormReactHook>;
            break;
        
        default:
            form = <FormFormik 
                        formFields={formFields} 
                        formSubmission={formSubmission} 
                        accountCreated={withdrawalCreated} >
                    </FormFormik>;
    }


    return (
            <>
            { user && balance > 0 ? <Card header={header} content={content} form={form}></Card> :
                    user ? 
                    <Card header={header} content="You must have a positive balance to make a withdrawal!" form=""></Card> : 
                    <Card header={header} content="You must create an account and have a positive balance to make a withdrawal!" form=""></Card> 
            }
            </>
    )

}

export default Withdraw;