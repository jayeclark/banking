import { useFormik } from 'formik';
import '../styles/Formik.css';
import Notification from './Notification.js';
import { useState } from 'react';
import data from '../data/en.json';

function FormFormik({formFields, formSubmission}) {

    const {successTitle, failureTitle} = data.general;

    let {buttons, success, failure, idRoot, submitHelper} = formSubmission
    let initialFieldValues = {};

    let manuallyClosed = {idRoot: null, closed: false};

    const [submitted, setSubmitted] = useState(false);
    const notification = {title: successTitle, type: 'success', text: success};

    for (let field in formFields) {
        const fieldName = formFields[field].name;
        initialFieldValues[fieldName] = '';
    }

    const formik = useFormik({

        initialValues: initialFieldValues,

        onSubmit: values => {

            const outcome = submitHelper(values);
            manuallyClosed.closed = false;

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

    const handleClick = () => {
        if (manuallyClosed.closed === false) {setSubmitted(false);}
        manuallyClosed.closed = true;
        manuallyClosed.idRoot = idRoot;
    }

    return (
        <form id={idRoot} className="form-formik" onSubmit={formik.handleSubmit}>
            {submitted === true ? <Notification title={notification.title} type={notification.type} text={notification.text} handleClick={handleClick}></Notification> : null}
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
                            <button id={idRoot + "-" + buttonEl.name} className={Object.values(formik.errors).every(x=>x==='') && Object.values(formik.values).some(x=> x !=='') ? buttonEl.className : buttonEl.className + ' disabled'} type={buttonEl.type}>{buttonEl.dependency && buttonEl.dependency() ? buttonEl.altDisplay : buttonEl.display}</button>
                        </div>
                    )
                    
                })}
                
            
            </div>
        </form>
    )

}

export default FormFormik;