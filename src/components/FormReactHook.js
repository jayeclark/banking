import { useForm } from 'react-hook-form';
import '../styles/ReactHook.css';
import Notification from './Notification.js';
import { useState } from 'react';
import data from '../data/en.json';
import { now } from 'lodash';
import { Helpers } from '../helpers/library';

function FormReactHook({formFields, formSubmission}) {

    const [submitted, setSubmitted] = useState(false);
    const { register, handleSubmit, getValues, setValue, formState: { errors } } = useForm({
        mode: 'onChange',
      });

    const { buttons, success, failure, idRoot, submitHelper } = formSubmission;
    const { successTitle, failureTitle } = data.general; 

    const initialFieldValues = {};
    for (let field in formFields) {
        const fieldName = formFields[field].name;
        initialFieldValues[fieldName] = '';
    }

    const [notification, setNotification] = useState({ title: successTitle, type: 'success', text: success, time: 5000 })
    let manuallyClosed = { closed: false, timeStamp: now().toString() };
    const handleClick = () => {
        if (manuallyClosed.closed === false) {setSubmitted(false);}
        manuallyClosed.closed = true;
        manuallyClosed.idRoot = idRoot;
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
        const timeStamp = now().toString();
        const notificationTime = notification.time;
        manuallyClosed.closed = false;
        manuallyClosed.timeStamp = timeStamp;

        if (outcome === 'failure') {
            const [type, title, text, time] = ['error', failureTitle, failure, notification.time];
            setNotification({ type, title, text, time });
            setSubmitted(true);
        }
        else {
            const [type, title, text, time] = ['success', successTitle, success, notification.time];
            setNotification({ type, title, text, time });
            setSubmitted(true);
        }

        for (let field in formFields) {
            let element = document.getElementById(formFields[field].name);
            element.value = '';
            setValue(formFields[field].name, '');
        }

        console.log(getValues());

        setTimeout(()=>{
            const createdTime = timeStamp;
            if (manuallyClosed.closed === false && manuallyClosed.timeStamp === createdTime) { setSubmitted(false) }
        }, notificationTime);

    }

    return (
        <form id={idRoot} className="react-hook" onSubmit={handleSubmit(onSubmit)}>
            {submitted === true ? <Notification title={notification.title} type={notification.type} text={notification.text} handleClick={handleClick} time={notification.time}></Notification> : null}
            {formFields.map((field,i)=>{
                return (
                    <div key={i} className="input-container">
                        <div className='field-name'><b>{field.display}</b></div>
                        <div className='input-lockup'>
                            <input type={field.type} autoComplete="off" id={field.name} name={field.name} className={errors.hasOwnProperty(field.name) && getValues()[field.name] ? 'input-visible-error' : errors.hasOwnProperty(field.name) ? 'input-error' : getValues()[field.name] ?  'input-visible-noerror' : 'input-noerror'} {...register(field.name, { validate: composeValidators(getValidators(field, getValues()[field.name])) })} />
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
                            <button id={idRoot + "-" + buttonEl.name} className={Object.values(errors).every(x => x.message === '' ) && Object.values(getValues()).some(x => x !== '') ? buttonEl.className : buttonEl.className + ' disabled'} type={buttonEl.type}>
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