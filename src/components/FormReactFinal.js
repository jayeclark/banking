import { Form, Field } from 'react-final-form';
import Notification from './Notification';
import { useState } from 'react';
import data from '../data/en.json';
import { Helpers } from '../helpers/library';
import '../styles/ReactFinal.css';
import { now } from 'lodash';

function FormReactFinal({formFields, formSubmission}) {

    const [submitted, setSubmitted] = useState(false);

    const { buttons, success, failure, idRoot, submitHelper } = formSubmission;
    const { successTitle, failureTitle } = data.general;

    const initialFieldValues = {};
    for (let field in formFields) {
        const fieldName = formFields[field].name;
        initialFieldValues[fieldName] = '';
    }

    let notification = { title: successTitle, type: 'success', text: success, time: 5000 };
    let manuallyClosed = { closed: false, timeStamp: null };
    const handleClick = () => {
        if (manuallyClosed.closed === false) {setSubmitted(false);}
        manuallyClosed.closed = true;
    }

    const getValidators = (field, value) => {
        const validators = [];
        const validation = field.validation;
        for (let item of validation) {
            let validatorFunction = item.function;
            let errorMsg = item.error;
            let itemArgValues = [];
            if (item.hasOwnProperty("args")) {
                let itemArgs = item["args"];
                itemArgValues = itemArgs.reduce((a,b) => {a.push(b.value); return a;},[]);
            }

            const thisValidator = (value='') => {
                if (itemArgValues.length > 1) {
                    return validatorFunction(value, ...itemArgValues) ? undefined : errorMsg
                }
                else if (itemArgValues.length === 1) {
                    return validatorFunction(value, itemArgValues[0]) ? undefined : errorMsg
                }
                return validatorFunction(value) ? undefined : errorMsg;
            }
            validators.push(thisValidator);
        }
        return validators;
    }

    const composeValidators = (validators) => (value) => {
        let reduced = validators.reduce((error, validator) => error || validator(value), undefined);
        return reduced;
    }
        

    const onSubmit = values => {

        const outcome = submitHelper(values);

        const timeStamp = now();
        manuallyClosed.closed = false;
        manuallyClosed.timeStamp = timeStamp.toString();

        if (outcome === 'failure') {
            const [type, title, text, time] = ['error', failureTitle, failure, notification.time];
            notification = { type, title, text, time };
            setSubmitted(true);
        }
        else {
            formSubmission.accountCreated = true;
            const buttonArr = formSubmission.buttons.filter(x => x.type="submit")[0];
            let buttonEl = document.getElementById(idRoot+"-"+buttonArr.name);
            if (buttonArr.hasOwnProperty("altDisplay")) { buttonEl.innerHTML = buttonArr.altDisplay; }
            
            const [type, title, text, time] = ['success', successTitle, success, notification.time];
            notification = { type, title, text, time};
            setSubmitted(true);
        }

        for (let field in formFields) {
            let element = document.getElementById(formFields[field].name);
            element.value = '';
            values[formFields[field].name] = '';
        }

        setTimeout(()=>{
            const createdTime = timeStamp;
            if (manuallyClosed.closed === false && manuallyClosed.timeStamp === createdTime) { setSubmitted(false) }
        }, notification.time);
    
    }

    return (
        <Form 
            onSubmit={onSubmit}
            initialValues={initialFieldValues}
            render={({ handleSubmit, submitting, pristine, values, hasValidationErrors }) => (
                <form id={idRoot} className="react-final" onSubmit={handleSubmit}>
                    {submitted === true ? <Notification title={notification.title} type={notification.type} text={notification.text} handleClick={handleClick} time={notification.time}></Notification> : null}
                    {formFields.map((field,i)=> {
                        return (
                            <Field key={i} name={field.name} validate={composeValidators(getValidators(field, values[field.name]))}>
                                {({ input, meta }) => (
                                    <div key={i} className="input-container">
                                        <div className="field-name"><b>{field.display}</b></div>
                                        <div className="input-lockup">
                                            <input {...input} type={field.type} autoComplete="off" id={field.name} name={field.name} placeholder={field.display} className={meta.error && input.value ? 'input-visible-error' : meta.error ? 'input-error ' : input.value ? 'input-visible-noerror' : 'input-noerror'}/>
                                            {meta.error && meta.touched && <span className="error">{meta.error}</span>}
                                        </div>
                                    </div>
                                )}
                            </Field>

                        )
                    })}
                    <div className="buttons">
                        <div className="button-buffer"></div>
                        {buttons.map((buttonEl,i)=>{
                            return (
                                <div key={i} className="button-container">
                                    <button 
                                        id={idRoot + "-" + buttonEl.name} 
                                        type={buttonEl.type}
                                        disabled={submitting || pristine || hasValidationErrors}
                                        className={buttonEl.className}
                                    >
                                        {buttonEl.dependency && Helpers[buttonEl.dependency]() ? buttonEl.altDisplay : buttonEl.display}
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </form>
            )}
        />
    )

}

export default FormReactFinal;