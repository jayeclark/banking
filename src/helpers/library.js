import { useContext } from 'react';
import UserDBContext from "./UserDBContext";

export const getUser = (userDBObj, userNum) => {
    const users = userDBObj.users;
    let user =  userNum !== null ? users.filter(x=>x.number === userNum)[0] :   
                users.length > 0 ? users[0] : null
    return user;
}

export const getUserCount = (users) => users.length;

export const UsersExist = () => {
    const { users } = useContext(UserDBContext);
    return users ? users.length > 0 : false;
}

export const parseNumber = (str, numDigits) => Number(Number(str.replace(',','')).toFixed(numDigits));

export function parseValidation(formFields, validationFunctions, availableArgs) {

    if (!availableArgs) {availableArgs = {}};

    formFields.forEach((field,i)=>{

        field.validation.forEach((v,j)=>{

            // Import validation functions based on reference name
            if (!v.hasOwnProperty("function") || !v["function"]) {
                const name = v.functionName;
                v["function"] = validationFunctions[name];
            }
            
            // Import any additional arguments beyond 'value', as needed
            if (v.hasOwnProperty("args")) {

                let args = v["args"];
                // Add relevant value to each arg object
                formFields[i].validation[j].args = args.map((a,k)=>{
                    if (availableArgs.hasOwnProperty(a.name)) {
                       a.value = availableArgs[a.name];
                    }
                    return a;
                })
            }

        })
    })

}

export const Helpers = { getUser, getUserCount, UsersExist, parseNumber, parseValidation}