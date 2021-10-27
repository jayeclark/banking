import React from 'react';
import { Form, Field } from 'react-final-form';
import { Helpers } from '../helpers/library';
import '../styles/ReactFinal.css';

function FormReactFinal({formFields, formSubmission}) {

    const { buttons, idRoot, submitHelper } = formSubmission;

    const initialFieldValues = {};
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

        // Only change the button and reset the form if submission was successful
        if (outcome === 'success') {
           formSubmission.accountCreated = true;
            const buttonArr = formSubmission.buttons.filter(x => x.type="submit")[0];
            let buttonEl = document.getElementById(idRoot+"-"+buttonArr.name);
            if (buttonArr.hasOwnProperty("altDisplay")) { buttonEl.innerHTML = buttonArr.altDisplay; }
  
            for (let field in formFields) {
                let element = document.getElementById(formFields[field].name);
                element.value = '';
                values[formFields[field].name] = '';
            }
        }
    }

    return (
        <Form 
            onSubmit={onSubmit}
            initialValues={initialFieldValues}
            render={({ handleSubmit, submitting, pristine, values, hasValidationErrors }) => (
                <form id={idRoot} className="react-final" onSubmit={handleSubmit}>
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