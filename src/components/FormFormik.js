import { useFormik } from 'formik';

function FormFormik({formFields, formSubmission, accountCreated, setAccountCreated}) {

    let {buttons, success, idRoot} = formSubmission
    let initialFieldValues = {};

    for (let field in formFields) {
        const fieldName = formFields[field].name;
        initialFieldValues[fieldName] = '';
    }

    const formik = useFormik({

        initialValues: initialFieldValues,

        onSubmit: values => {
            console.log(values);
            alert(success);
            for (let field in formFields) {
                let element = document.getElementById(formFields[field].name);
                element.value = '';
                values[formFields[field].name] = '';
            }
            accountCreated = true;
            const buttonArr = formSubmission.buttons.filter(x=> x.type="submit")[0];
            console.log(buttonArr);
            let buttonEl = document.getElementById(idRoot+"-"+buttonArr.name);
            console.log(buttonEl);
            buttonEl.innerHTML = buttonArr.altDisplay;
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

    return (
        <form onSubmit={formik.handleSubmit}>
            {formFields.map((field,i)=>{
                return (
                    <div key={i}>
                        <div>{field.display}</div>
                        <div>
                            <input type={field.type} autoComplete="off" id={field.name} name={field.name} onChange={formik.handleChange} value={formik.values[field.name]}/>
                            {formik.errors[field.name] ? <div id={idRoot + "-" + field.name + "Error"}>{formik.errors[field.name]}</div> : null }
                        </div>
                    </div>
                )
            })}
            <div>
                {buttons.map((buttonEl,i)=>{
                    return (
                        <div key={i}>
                            <button id={idRoot + "-" + buttonEl.name} className={Object.values(formik.errors).every(x=>'') ? buttonEl.className : buttonEl.className + ' disabled'} type={buttonEl.type}>{buttonEl.dependency() ? buttonEl.altDisplay : buttonEl.display}</button>
                        </div>
                    )
                    
                })}
                
            
            </div>
        </form>
    )

}

export default FormFormik;