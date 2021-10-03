import { useFormik } from 'formik';
import '../styles/formik.css';
import Notification from './Notification.js';
import { useState } from 'react';

function FormFormik({formFields, formSubmission}) {

    let {buttons, success, failure, idRoot, submitHelper} = formSubmission
    let initialFieldValues = {};

    const [submitted, setSubmitted] = useState(false);
    const notification = {title: 'Success', type: 'success', text: success};

    for (let field in formFields) {
        const fieldName = formFields[field].name;
        initialFieldValues[fieldName] = '';
    }

    const formik = useFormik({

        initialValues: initialFieldValues,

        onSubmit: values => {

            const outcome = submitHelper(values);

            if (outcome === 'failure') {
                notification.type = 'error';
                notification.title = 'Account Create Failed';
                notification.text = failure;
                setSubmitted(true);
            }
            else {
                formSubmission.accountCreated = true;
                const buttonArr = formSubmission.buttons.filter(x=> x.type="submit")[0];
                let buttonEl = document.getElementById(idRoot+"-"+buttonArr.name);
                buttonEl.innerHTML = buttonArr.altDisplay;
                
                notification.type = 'success';
                notification.title = 'Success';
                notification.text = success;
                setSubmitted(true);
            }

            for (let field in formFields) {
                let element = document.getElementById(formFields[field].name);
                element.value = '';
                values[formFields[field].name] = '';
            }

            setTimeout(()=>setSubmitted(false),5000);
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
                    if(validationFunction(value) === false) { errors[thisField.name] = errorMsg }
                }

            }

            return errors;

        }

    })

    const handleClick = () => {
        setSubmitted(false);
    }

    return (
        <form id={idRoot} className="form-formik" onSubmit={formik.handleSubmit}>
            {submitted === true ? <Notification title={notification.title} type={notification.type} text={notification.text} handleClick={handleClick}></Notification> : null}
            {formFields.map((field,i)=>{
                return (
                    <div key={i} className="input-container">
                        <div className='field-name'><b>{field.display}</b></div>
                        <div className='input-lockup'>
                            <input type={field.type} autoComplete="off" id={field.name} name={field.name} onChange={formik.handleChange} value={formik.values[field.name]} style={{outlineColor: formik.errors[field.name] ? 'red' : 'green' }}/>
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
                            <button id={idRoot + "-" + buttonEl.name} className={Object.values(formik.errors).every(x=>x==='') && Object.values(formik.values).some(x=> x !=='') ? buttonEl.className : buttonEl.className + ' disabled'} type={buttonEl.type}>{buttonEl.dependency() ? buttonEl.altDisplay : buttonEl.display}</button>
                        </div>
                    )
                    
                })}
                
            
            </div>
        </form>
    )

}

export default FormFormik;