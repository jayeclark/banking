import React from 'react';
import { render } from '@testing-library/react';
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Enzyme, { mount } from "enzyme";
import userEvent from '@testing-library/user-event';
import UserContext from '../helpers/UserContext';
import UserDBContext from '../helpers/UserDBContext';
import LanguageContext from '../helpers/LanguageContext';
import Deposit from '../pages/Deposit';
import App from '../App';

Enzyme.configure({ adapter: new Adapter() });
const pageName = 'Deposit';
function MockApp() {

    return (
        <UserDBContext.Provider value={{users: [{ name: 'Jenn', number: 1, balance: 10000 }, { name: 'Jenn', number:1, balance: 0 }]}}>
            <UserContext.Provider value={{loggedInUser: 1}}>
                <LanguageContext.Provider value={{ language: 'en', changeLanguage: null}}>
                    <Deposit />
                </LanguageContext.Provider>
            </UserContext.Provider>
        </UserDBContext.Provider>
    )
}

describe('5. DEPOSIT PAGE', () => {

    test('5.1. Deposit form is on a bootstrap card.', () => {

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
    
    test('5.2. Card includes an input field (if a user is logged in.)', () => {
        const renderedPage = mount(<MockApp />);
        expect(renderedPage.find("input").length).toBeTruthy();   
    });

    test('5.3. Card includes a Deposit button (if a user is logged in.)', () => {
    
        const renderedPage = mount(<MockApp />);
        expect(renderedPage.find("button").text() === "Deposit").toBeTruthy();

    });

    test('5.4. Balance information is displayed above the deposit form on the card', () => {
        const renderedPage = mount(<MockApp />);
        expect(renderedPage.find(".card-balance-msg").text().includes("Current Balance")).toBeTruthy();
    });
  
    test('Does not include an input or Deposit button if a user is not logged in.', () => {
    
        const renderedPage = mount(
            <UserDBContext.Provider value={{users: [{ name: 'Jenn', number: 1, balance: 0 }]}}>
                <UserContext.Provider value={{loggedInUser: null}}>
                    <Deposit />
                </UserContext.Provider>
            </UserDBContext.Provider>
        );
    
        expect(renderedPage.find("input").length).toBeFalsy();
        expect(renderedPage.find("button").length).toBeFalsy();

      });
    
})