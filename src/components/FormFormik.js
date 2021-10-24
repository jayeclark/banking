import { useFormik } from 'formik';
import '../styles/Formik.css';
import Notification from './Notification.js';
import { useState } from 'react';
import data from '../data/en.json';
import { Helpers } from '../helpers/library';
import { now } from 'lodash';

function FormFormik({ formFields, formSubmission }) {

    const [submitted, setSubmitted] = useState(false);

    const { buttons, success, failure, idRoot, submitHelper } = formSubmission;
    const { successTitle, failureTitle } = data.general;

    const initialFieldValues = {};
    for (let field in formFields) {
        const fieldName = formFields[field].name;
        initialFieldValues[fieldName] = '';
    }

    let notification = { title: successTitle, type: 'success', text: success, time: 5000 };
    let manuallyClosed = { closed: false, timeStamp: now().toString() };
    const handleClick = () => {
        if (manuallyClosed.closed === false) { setSubmitted(false); }
        manuallyClosed.closed = true;
    }

    const formik = useFormik({

        initialValues: initialFieldValues,

        onSubmit: values => {

            const outcome = submitHelper(values);
            const timeStamp = now().toString();
            manuallyClosed.closed = false;
            manuallyClosed.timeStamp = timeStamp;

            if (outcome === 'failure') {
                const [type, title, text, time] = ['error', failureTitle, failure, notification.time];
                notification = { type, title, text, time};
                setSubmitted(true);
            }
            else {
                formSubmission.accountCreated = true;
                const buttonArr = formSubmission.buttons.filter(x=> x.type="submit")[0];
                let buttonEl = document.getElementById(idRoot+"-"+buttonArr.name);
                if (buttonArr.hasOwnProperty("altDisplay")) {buttonEl.innerHTML = buttonArr.altDisplay;}
                
                const [type, title, text, time] = ['success', successTitle, success, notification.time];
                notification = { type, title, text, time };
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
        },

        validate: values => {
            let errors = {};
            for (let field in formFields) {
                const thisField = formFields[field];
                const validation = thisField.validation;

                for (let item of validation) {
                    let validationFunction = item.function;
                    let errorMsg = item.error;
                    let value = values[thisField.name];

                    if (item.hasOwnProperty("args")) {
                        let itemArgs = item["args"];
                        let itemArgValues = itemArgs.reduce((a,b) => {a.push(b.value); return a;},[]);
                        if (itemArgValues.length > 1 && validationFunction(value, ...itemArgValues) === false) { errors[thisField.name] = errorMsg }
                        else if (itemArgValues.length === 1 && validationFunction(value, itemArgValues[0]) === false) { errors[thisField.name] = errorMsg }
                    }
                    else {
                        if(validationFunction(value) === false) { errors[thisField.name] = errorMsg }
                    }
 
                    
                }

            }

            return errors;

        }

    })

    return (
        <form id={idRoot} className="form-formik" onSubmit={formik.handleSubmit}>
            {submitted === true ? <Notification title={notification.title} type={notification.type} text={notification.text} handleClick={handleClick} time={notification.time}></Notification> : null}
            {formFields.map((field,i)=>{
                return (
                    <div key={i} className="input-container">
                        <div className='field-name'><b>{field.display}</b></div>
                        <div className='input-lockup'>
                            <input type={field.type} autoComplete="off" id={field.name} name={field.name} onChange={formik.handleChange} value={formik.values[field.name]} className={formik.errors[field.name] && formik.values[field.name] ? 'input-visible-error' : formik.errors[field.name] ? 'input-error' : formik.values[field.name] ? 'input-visible-noerror' : 'input-noerror'} />
                            {formik.errors[field.name] ? <div id={idRoot + "-" + field.name + "Error"} className="error">{formik.errors[field.name]}</div> : null }
                        </div>
                    </div>
                )
            })}
            <div className='buttons'>
                <div className='button-buffer'></div>
                {buttons.map((buttonEl,i)=>{
                    return (
                        <div key={i} className="button-container">
                            <button id={idRoot + "-" + buttonEl.name} className={Object.values(formik.errors).every(x=>x==='') && Object.values(formik.values).some(x=> x !=='') ? buttonEl.className : buttonEl.className + ' disabled'} type={buttonEl.type}>
                                {buttonEl.dependency && Helpers[buttonEl.dependency]() ? buttonEl.altDisplay : buttonEl.display}
                            </button>
                        </div>
                    )
                    
                })}
            </div>
        </form>
    )

}

export default FormFormik;