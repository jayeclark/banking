import FormFormik from '../components/FormFormik';
import FormReactFinal from '../components/FormReactFinal';
import FormReactHook from '../components/FormReactHook';

function formParser(formType, fields, submission) {

    let form;

    switch (formType) {

        case 'formik':
            form = <FormFormik 
                        formFields={fields} 
                        formSubmission={submission} >
                    </FormFormik> ;
            break;

        case 'reactFinal':
            form = <FormReactFinal 
                        formFields={fields} 
                        formSubmission={submission}  >
                    </FormReactFinal>;
            break;

        case 'reactHook':
            form = <FormReactHook 
                        formFields={fields} 
                        formSubmission={submission} >
                    </FormReactHook>;
            break;
        
        default:
            form = <FormFormik 
                        formFields={fields} 
                        formSubmission={submission} >
                    </FormFormik>;
    }
    
    return form;
    
}

export default formParser;