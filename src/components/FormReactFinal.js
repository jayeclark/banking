import { Form, Field } from 'react-final-form';
import Notification from './Notification';
import { useState } from 'react';
import data from '../data/en.json';
import '../styles/ReactFinal.css';

function FormReactFinal({formFields, formSubmission}) {

    const { successTitle, failureTitle } = data.general;

    let { buttons, success, failure, idRoot, submitHelper } = formSubmission;
    let initialFieldValues = {};

    let manuallyClosed = {idRoot: null, closed: false};
    const [submitted, setSubmitted] = useState(false);
    const notification = { title: successTitle, type: 'success', text: success };

    for (let field in formFields) {
        const fieldName = formFields[field].name;
        initialFieldValues[fieldName] = '';
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
                else if (itemArgValues.length == 1) {
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
        console.log(reduced);
        return reduced;
    }
        

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

        for (let field in formFields) {
            let element = document.getElementById(formFields[field].name);
            element.value = '';
            values[formFields[field].name] = '';
        }

        setTimeout(()=>{if (manuallyClosed.closed === false && manuallyClosed.idRoot === idRoot) {setSubmitted(false)}},5000);
    
    }

    const handleClick = () => {
        if (manuallyClosed.closed === false) {setSubmitted(false);}
        manuallyClosed.closed = true;
        manuallyClosed.idRoot = idRoot;
    }

    //validate={composeValidators(...getValidators(field, values[field.name]))}

    return (
        <Form 
            onSubmit={onSubmit}
            initialValues={initialFieldValues}
            render={({ handleSubmit, submitting, pristine, values }) => (
                <form id={idRoot} className="react-final" onSubmit={handleSubmit}>
                    {submitted === true ? <Notification title={notification.title} type={notification.type} text={notification.text} handleClick={handleClick}></Notification> : null}
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
                                        disabled={submitting || pristine}
                                        className={buttonEl.className}
                                    >
                                        {buttonEl.dependency && buttonEl.dependency() ? buttonEl.altDisplay : buttonEl.display}
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