import React from 'react';
import { useForm } from 'react-hook-form';
import '../styles/ReactHook.css';
import { Helpers } from '../helpers/library';

function FormReactHook({formFields, formSubmission}) {

    const { register, handleSubmit, getValues, setValue, formState: { errors, isDirty } } = useForm({
        mode: 'onChange',
      });

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

    const composeValidators = (validators, value) => (value) => {
        let reduced = validators.reduce((error, validator) => error || validator(value), undefined);
        return reduced;
    }

    const onSubmit = values => {

        const outcome = submitHelper(values);

        // Only change the button and reset the form if submission was successful
        if (outcome === 'success') {
            for (let field in formFields) {
                let element = document.getElementById(formFields[field].name);
                element.value = '';
                setValue(formFields[field].name, '');
            }
        }
    }

    return (
        <form id={idRoot} className="react-hook" onSubmit={handleSubmit(onSubmit)}>
            {formFields.map((field,i)=>{
                return (
                    <div key={i} className="input-container">
                        <div className='field-name'><b>{field.display}</b></div>
                        <div className='input-lockup'>
                            <input 
                                type={field.type} 
                                autoComplete="off" 
                                id={field.name} 
                                name={field.name} 
                                className={errors.hasOwnProperty(field.name) && getValues()[field.name] ? 'input-visible-error' : errors.hasOwnProperty(field.name) ? 'input-error' : getValues()[field.name] ?  'input-visible-noerror' : 'input-noerror'} 
                                {...register(field.name, { validate: composeValidators(getValidators(field, getValues()[field.name]), getValues()[field.name]) })} />
                            {errors.hasOwnProperty(field.name) ? <div id={idRoot + "-" + field.name + "Error"} className="error">{errors[field.name].message}</div> : null}
                        </div>
                    </div>
                )
            })}
            <div className="buttons">
                <div className="button-buffer"></div>
                {buttons.map((buttonEl,i)=>{
                    return (
                        <div key={i} className="button-container">
                            <button id={idRoot + "-" + buttonEl.name} className={Object.values(errors).length === 0 && (isDirty || Object.values(getValues()).length > 0) ? buttonEl.className : buttonEl.className + ' disabled'} type={buttonEl.type}>
                                {buttonEl.dependency && Helpers[buttonEl.dependency]() ? buttonEl.altDisplay : buttonEl.display}
                            </button>
                        </div>
                    )
                })}
            </div>
        </form>
    )

}

export default FormReactHook;