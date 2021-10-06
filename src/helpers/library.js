
export const getUser = (userDBObj, userNum) => {
    const users = userDBObj.users;
    let user =  userNum !== null ? users.filter(x=>x.number === userNum)[0] :   
                users.length > 0 ? users[0] : null
    return user;
}

export const getUserCount = (users) => users.length;

export const parseNumber = (str, numDigits) => Number(str.replace(',','')).toFixed(numDigits);

export function parseValidation(formFields,validationFunctions,availableArgs={}) {

    formFields.forEach((field,i)=>{

        field.validation.forEach((v,j)=>{

            // Import validation functions based on reference name
            if (!v.hasOwnProperty("function") || !v["function"]) {
                const name = v.functionName;
                v["function"] = validationFunctions[name];
            }
            
            // Import any additional arguments beyond 'value', as needed
            if (v.hasOwnProperty("args")) {

                // Add relevant value to each arg object
                v["args"].forEach((a,k)=>{
                    if (availableArgs.hasOwnProperty(a.name)) {
                       formFields[i].validation[j]["args"][k].value = availableArgs[a.name];
                    }
                })
            }

        })
    })

}
