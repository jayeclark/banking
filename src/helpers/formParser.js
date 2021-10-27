import React from 'react';
import FormFormik from '../components/FormFormik';
import FormReactFinal from '../components/FormReactFinal';
import FormReactHook from '../components/FormReactHook';

function formParser(formType, fields, submission) {

    let formComponent;

    switch (formType) {

        case 'formik':
            formComponent = <FormFormik 
                        formFields={fields} 
                        formSubmission={submission} >
                    </FormFormik> ;
            break;

        case 'reactFinal':
            formComponent = <FormReactFinal 
                        formFields={fields} 
                        formSubmission={submission}  >
                    </FormReactFinal>;
            break;

        case 'reactHook':
            formComponent = <FormReactHook 
                        formFields={fields} 
                        formSubmission={submission} >
                    </FormReactHook>;
            break;
        
        default:
            formComponent = <FormFormik 
                        formFields={fields} 
                        formSubmission={submission} >
                    </FormFormik>;
    }
    
    return formComponent;
    
}

export default formParser;