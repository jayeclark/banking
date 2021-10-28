import React from 'react';
import { render } from '@testing-library/react';
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Enzyme, { mount } from "enzyme";
import userEvent from '@testing-library/user-event';
import App from '../App.js';
import UserContext from '../helpers/UserContext';
import UserDBContext from '../helpers/UserDBContext';
import LanguageContext from '../helpers/LanguageContext';
import Withdraw from '../pages/Withdraw';

Enzyme.configure({ adapter: new Adapter() });
function MockApp() {

    return (
        <UserDBContext.Provider value={{users: [{ name: 'Jenn', number: 1, balance: 10000 }, { name: 'Jenn', number:1, balance: 0 }]}}>
            <UserContext.Provider value={{loggedInUser: 1}}>
                <LanguageContext.Provider value={{ language: 'en', changeLanguage: null}}>
                    <Withdraw />
                </LanguageContext.Provider>
            </UserContext.Provider>
        </UserDBContext.Provider>
    )
}
const pageName = 'Withdraw';

describe('7. WITHDRAW PAGE', () => {

    test('7.1. Includes a bootstrap card.', () => {

        const { getByText } = render(<App />);
        const page = getByText(pageName);
        userEvent.click(page);
        
        // Check that bootstrap is in the styles section as a file
        const checkForBootstrap = () => {
            const fs = require('fs');
            const path = "../styles/bootstrap.min.css";
            let result = false;
            try {
                result = fs.existsSync(path);
            } catch(err) {}
            return result;
        }
        expect(checkForBootstrap).toBeTruthy();
    
        // Check that some basic navbar classes are used in the Navigation
        const class1 = 'card';
        const class2 = 'card-header';
        expect(Array.from(document.getElementsByClassName(class1)).length).toBeGreaterThan(0);
        expect(Array.from(document.getElementsByClassName(class2)).length).toBeGreaterThan(0);
      });

    test('7.2. Card includes an input field (if a user is logged in and has a positive balance.)', () => {
        const renderedPage = mount(<MockApp />);
        expect(renderedPage.find("input").length).toBeTruthy();   
    });

    test('7.3. Card includes a Withdraw button (if a user is logged in.)', () => {
        const renderedPage = mount(<MockApp />);
        expect(renderedPage.find("button").text() === "Withdraw").toBeTruthy();
    });

    test('7.4. Balance information is displayed above the deposit form on the card', () => {
        const renderedPage = mount(<MockApp />);
        expect(renderedPage.find(".card-balance-msg").text().includes("Current Balance")).toBeTruthy();
    });

    test('Does not include an input or Deposit button if a user is not logged in.', () => {

        const renderedPage = mount(
            <UserDBContext.Provider value={{users: [{ name: 'Jenn', number: 1, balance: 0 }]}}>
                <UserContext.Provider value={{loggedInUser: null}}>
                    <Withdraw />
                </UserContext.Provider>
            </UserDBContext.Provider>
        );

        expect(renderedPage.find("input").length).toBeFalsy();
        expect(renderedPage.find("button").length).toBeFalsy();

    });

    test('Does not include an input or Deposit button if a user has 0 balance.', () => {

        const renderedPage = mount(
            <UserDBContext.Provider value={{users: [{ name: 'Jenn', number: 1, balance: 0 }]}}>
                <UserContext.Provider value={{loggedInUser: 1}}>
                    <Withdraw />
                </UserContext.Provider>
            </UserDBContext.Provider>
        );

        expect(renderedPage.find("input").length).toBeFalsy();
        expect(renderedPage.find("button").length).toBeFalsy();

    });
})
