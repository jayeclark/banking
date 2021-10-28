import React, { useState } from 'react';
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Enzyme, { mount } from "enzyme";
import { act } from 'react-dom/test-utils';
import UserContext from '../helpers/UserContext';
import LanguageContext from '../helpers/LanguageContext';
import UserDBContext from '../helpers/UserDBContext';
import CreateAccount from '../pages/CreateAccount';

Enzyme.configure({ adapter: new Adapter() });

function MockApp() {

    return (
        <UserDBContext.Provider value={{users: [{ name: 'Jenn', number: 1, balance: 0 }, { name: 'Jenn', number:1, balance: 0 }]}}>
            <UserContext.Provider value={{loggedInUser: null}}>
                <LanguageContext.Provider value={{ language: 'en', changeLanguage: null}}>
                    <CreateAccount />
                </LanguageContext.Provider>
            </UserContext.Provider>
        </UserDBContext.Provider>
    )
}

describe('4. CREATE ACCOUNT FUNCTIONALITY', () => {

    test('4.1. Upon selecting the Create Account button, the user should see a success message', async () => {

        const renderedPage = mount(<MockApp />)

        const promise = () => {
            return new Promise(resolve => {
                renderedPage.find("#name").simulate('change', {target: {value: 'Jenn', id: 'name'}});
                renderedPage.find("#email").simulate('change', {target: {value: 'me@me.com', id: 'email'}});
                renderedPage.find("#password").simulate('change', {target: {value: '1*hhhhhh', id: 'password'}});
                renderedPage.find("#create-account-submit").simulate('click');

                setTimeout(() => {
                    renderedPage.update();
                    resolve(renderedPage);
                }, 300);
            })
        }

        await act(async () => {
            return promise().then((result) => {
                expect(result.find(".notification-container")).toBeTruthy();
            });
        });

        renderedPage.unmount();
    });
       
    test('4.2. Upon selecting the Create Account button, the user should see an Add Another Account button', async () => {

        function FakeApp({userDB}) {

            const [users, setUsers] = useState(userDB);
            const [loggedInUser, setLoggedInUser] = useState('');

            function logIn(val) {
                setLoggedInUser(val);
              }

            function addUser(user) {
                let currentUsers = [...users];
                currentUsers.push(user);
                setUsers(currentUsers);
                console.log(currentUsers);
              }

            return (
                <UserDBContext.Provider value={{users, addUser}}>
                    <UserContext.Provider value={{loggedInUser, logIn}}>
                        <CreateAccount />
                    </UserContext.Provider>
                </UserDBContext.Provider>
            )
        }

        // Submit button should say 'Create Account' if there are no users
        const noUsers = [];
        const renderedWithNoUsers = mount(<FakeApp userDB={noUsers}/>)
        expect(renderedWithNoUsers.find("#create-account-submit").text()).toEqual("Create Account");
        renderedWithNoUsers.unmount();
        
        // Submit button should say 'Add Another Account' if there are users
        const users = [{name: 'Jenn', email: 'me@me.com', password: '1*hhhhhh', balance: 0}];
        const renderedWithUsers = mount(<FakeApp userDB={users}/>)
        expect(renderedWithUsers.find("#create-account-submit").text()).toEqual("Add Another Account");
        renderedWithUsers.unmount();
    });

    test('4.3. Upon selecting the Create Account button, the user will be able to open a cleared Create Account form', async () => {
        
        const renderedPage = mount(
            <MockApp />
        )

        const promise = () => {
            return new Promise(resolve => {
                renderedPage.find("#name").simulate('change', {target: {value: 'Jenn', id: 'name'}});
                renderedPage.find("#email").simulate('change', {target: {value: 'me@gmail.com', id: 'email'}});
                renderedPage.find("#password").simulate('change', {target: {value: '1*hhhhhh', id: 'password'}});
                renderedPage.find("#create-account-submit").simulate('click');

                setTimeout(() => {
                    renderedPage.update();
                    resolve(renderedPage);
                }, 300);
            })
        }

        await act(async () => {
            return promise().then((result) => {
                expect(result.find("#name").text() === "").toBeTruthy();
                expect(result.find("#email").text() === "").toBeTruthy();
                expect(result.find("#password").text() === "").toBeTruthy();
            });
        });

        renderedPage.unmount();
    });

    test('4.4. The user receives an alert if the name field is left blank', async () => {
        
        const renderedPage = mount(<MockApp />)

        const promise = () => {
            return new Promise(resolve => {
                renderedPage.find("#name").simulate('change', {target: {value: ' ', id: 'name'}});
                renderedPage.find("#name").simulate('focus');
                renderedPage.find("#name").simulate('change', {target: {value: '', id: 'name'}});

                setTimeout(() => {
                    renderedPage.update();
                    resolve(renderedPage);
                }, 300);
            })
        }

        await act(async () => {
            return promise().then((result) => {
                expect(result.find("#create-account-nameError").text()).toBeTruthy();
            });
        });

        renderedPage.unmount();
    });
     
    test('4.5. The user receives an alert if the email field is left blank', async () => {
        
        const renderedPage = mount(<MockApp />);

        const promise = () => {
            return new Promise(resolve => {
                renderedPage.find("#email").simulate('change', {target: {value: ' ', id: 'email'}});
                renderedPage.find("#email").simulate('focus');
                renderedPage.find("#email").simulate('change', {target: {value: '', id: 'email'}});

                setTimeout(() => {
                    renderedPage.update();
                    resolve(renderedPage);
                }, 300);
            })
        }

        await act(async () => {
            return promise().then((result) => {
                expect(result.find("#create-account-emailError").text()).toBeTruthy();
            });
        });

        renderedPage.unmount();
    });
     
    test('4.6. The user receives an alert if the password is less than 8 characters', async () => {

        const renderedPage = mount(<MockApp />)

        const promise = () => {
            return new Promise(resolve => {
                renderedPage.find("#password").simulate('change', {target: {value: ' ', id: 'password'}});
                renderedPage.find("#password").simulate('focus');
                renderedPage.find("#password").simulate('change', {target: {value: '1*hhh', id: 'password'}});

                setTimeout(() => {
                    renderedPage.update();
                    resolve(renderedPage);
                }, 300);
            })
        }

        await act(async () => {
            return promise().then((result) => {
                expect(result.find("#create-account-passwordError").text()).toBeTruthy();
            });
        });

        renderedPage.unmount();
    });
     
    test('4.7. The submit button should be disabled in the case of no input', () => {

        const renderedPage = mount(<MockApp />)

        // Submit button should be disabled if no input
        const submitButton = renderedPage.find("#create-account-submit")
        expect(submitButton.hasClass('disabled')).toBeTruthy();

        renderedPage.unmount();
    });
})