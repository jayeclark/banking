import React from 'react';
import { useFormik } from 'formik';
import '../styles/Formik.css';
import { Helpers } from '../helpers/library';
import '../styles/forms.css';

function FormFormik({ formFields, formSubmission }) {

    const { buttons, idRoot, submitHelper } = formSubmission;

    const initialFieldValues = {};
    for (let field in formFields) {
        const fieldName = formFields[field].name;
        initialFieldValues[fieldName] = '';
    }

    const formik = useFormik({

        initialValues: initialFieldValues,

        onSubmit: values => {

            const outcome = submitHelper(values);

            // Only change the button and reset the form if submission was successful
            if (outcome === 'success') {

                formSubmission.accountCreated = true;
                const buttonArr = formSubmission.buttons.filter(x=> x.type="submit")[0];
                let buttonEl = document.getElementById(idRoot+"-"+buttonArr.name);
                if (buttonArr.hasOwnProperty("altDisplay")) {buttonEl.innerHTML = buttonArr.altDisplay;}
                
                for (let field in formFields) {
                    let element = document.getElementById(formFields[field].name);
                    element.value = '';
                    values[formFields[field].name] = '';
                }

            }

        },

        validate: values => {
            let errors = {};
            for (let field in formFields) {
                const thisField = formFields[field];
                const {validation} = thisField;

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
            {formFields.map((field,i)=>{
                return (
                    <div key={i} className="input-container">
                        <label className='field-name' htmlFor={field.name}><b>{field.display}</b></label>
                        <div className='input-lockup'>
                            <input type={field.type} autoComplete="off" id={field.name} name={field.name} placeholder={field.placeholder} onChange={formik.handleChange} value={formik.values[field.name]} className={formik.errors[field.name] && formik.values[field.name] ? 'input-visible-error' : formik.errors[field.name] ? 'input-error' : formik.values[field.name] ? 'input-visible-noerror' : 'input-noerror'} />
                            {formik.errors[field.name] ? <div id={idRoot + "-" + field.name + "Error"} className="error">{formik.errors[field.name]}</div> : null }
                        </div>
                    </div>
                )
            })}
            <div className='buttons'>
                <div className='button-buffer'></div>
                {buttons.map((buttonEl,i)=>{
                    return (
                        <div key={i} className="button-container" style={buttons.length === 1 ? {width: "calc(100% + 8px)", marginLeft: -4, marginRight: -4} : null}>
                            <button id={idRoot + "-" + buttonEl.name} style={{ padding: "8px"}} className={Object.values(formik.errors).every(x=>x==='') && Object.values(formik.values).some(x=> x !=='') ? buttonEl.className : buttonEl.className + ' disabled'} type={buttonEl.type}>
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