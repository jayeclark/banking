import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App.js';

describe('3. CREATE ACCOUNT PAGE', () => {

    test('3.1. Includes a bootstrap card with a form', async () => {

        const { getByText, getAllByText } = render(<App />);
        const login = getByText("Login");
        userEvent.click(login);
        const createAccount = getAllByText("Open an Account")[0];    
        userEvent.click(createAccount);
        
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
    
        // Check that the card has a form in it
        const card = document.getElementById('create-account-page');
        expect(card.getElementsByTagName('form')).toBeDefined();
    
      });
       
    test('3.2. Form includes: name, email, password input fields', () => {
    
        const { getAllByText } = render(<App />);
        const createAccount = getAllByText('Create Account');
        userEvent.click(createAccount[0]);
    
        const fieldNames = document.getElementsByClassName('field-name');
        expect(fieldNames[0].innerHTML.includes('Name')).toBeTruthy();
        expect(fieldNames[1].innerHTML.includes('Email')).toBeTruthy();
        expect(fieldNames[2].innerHTML.includes('Password')).toBeTruthy();
    });
    
    test('3.3. Form includes Create Account button.', () => {
        const { getAllByText } = render(<App />);
    
        const createAccount = getAllByText('Create Account');
        expect(createAccount.length > 0).toBeTruthy();
    
        const buttonContainer = document.getElementsByClassName('button-container');
        expect(buttonContainer).toBeDefined();
    
        const submitButton = document.getElementById('create-account-submit');
        expect(submitButton.innerHTML.includes('Create Account')).toBeTruthy();
    });

})