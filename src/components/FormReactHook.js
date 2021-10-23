import { useForm } from 'react-hook-form';
import '../styles/ReactHook.css';
import Notification from './Notification.js';
import { useState } from 'react';
import data from '../data/en.json';

function FormReactHook({formFields, formSubmission}) {

    const { register, handleSubmit } = useForm();

    const {successTitle, failureTitle} = data.general;

    let { buttons, success, failure, idRoot, submitHelper } = formSubmission;

    let initialFieldValues = {};
    for (let field in formFields) {
        const fieldName = formFields[field].name;
        initialFieldValues[fieldName] = '';
    }

    let manuallyClosed = {idRoot: null, closed: false};

    const [submitted, setSubmitted] = useState(false);
    const notification = {title: successTitle, type: 'success', text: success};

    const onSubmit = values => {
        const outcome = submitHelper(values);
        manuallyClosed.closed = false;
        manuallyClosed.idRoot = idRoot;

        if (outcome === 'failure') {
            notification.type = 'error';
            notification.title = failureTitle;
            notification.text = failure;
            setSubmitted(true);
        }
        else {
            formSubmission.accountCreated = true;
            const buttonArr = formSubmission.buttons.filter(x=> x.type="submit")[0];
            let buttonEl = document.getElementById(idRoot+"-"+buttonArr.name);
            if (buttonArr.hasOwnProperty("altDisplay")) {buttonEl.innerHTML = buttonArr.altDisplay;}
            
            notification.type = 'success';
            notification.title = successTitle;
            notification.text = success;
            setSubmitted(true);
        }

        setTimeout(()=>{if (manuallyClosed.closed === false && manuallyClosed.idRoot === idRoot) {setSubmitted(false)}},5000);

    }

    const handleClick = () => {
        if (manuallyClosed.closed === false) {setSubmitted(false);}
        manuallyClosed.closed = true;
        manuallyClosed.idRoot = idRoot;
    }

    return (
        <form id={idRoot} className="react-hook" onSubmit={handleSubmit(onSubmit)}>
            {submitted === true ? <Notification title={notification.title} type={notification.type} text={notification.text} handleClick={handleClick}></Notification> : null}
            {formFields.map((field,i)=>{
                return (
                    <div key={i} className="input-container">
                        <div className='field-name'><b>{field.display}</b></div>
                        <div className='input-lockup'>
                            <input type={field.type} autoComplete="off" id={field.name} name={field.name} className="input-noerror" {...register(field.name)} />
                        </div>
                    </div>
                )
            })}
            <div className='buttons'>
                <div className='button-buffer'></div>
                {buttons.map((buttonEl,i)=>{
                    return (
                        <div key={i} className="button-container">
                            <button id={idRoot + "-" + buttonEl.name} className={buttonEl.className} type={buttonEl.type}>
                                {buttonEl.dependency && buttonEl.dependency() ? buttonEl.altDisplay : buttonEl.display}
                            </button>
                        </div>
                    )
                })}
            </div>
        </form>
    )

}

export default FormReactHook;