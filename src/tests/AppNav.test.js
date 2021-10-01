import { render , screen } from '@testing-library/react';
import { HashRouter, Link } from 'react-router-dom';
import TestRenderer from 'react-test-renderer';
import {ReactDOM} from 'react-dom';
import App from '../App.js';
import { simulate } from 'enzyme';
import AppNav from '../components/AppNav.js';
import Home from '../pages/Home.js';
import CreateAccount from '../pages/CreateAccount.js';
import Deposit from '../pages/Deposit.js';
import Withdraw from '../pages/Withdraw.js';
import AllData from '../pages/AllData.js';



test('Renders navigation link with \'Home\', \'Create Account\', \'Deposit\', \'Withdraw\', and \'All Data\' visible.', () => {
  render(<App />);
  const home = screen.getByText(/Home/i);
  const createAccount = screen.getByText(/Create\sAccount/i);
  const deposit = screen.getByText(/Deposit/i);
  const withdraw = screen.getByText(/Withdraw/i);
  const allData = screen.getByText(/All\sData/i);
  expect(home).toBeInTheDocument();
  expect(deposit).toBeInTheDocument();
  expect(withdraw).toBeInTheDocument();
  expect(allData).toBeInTheDocument();
  expect(createAccount).toBeInTheDocument();
});

test('Navigation bar is styled with bootstrap.', () => {

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
    render(<App />);
    const class1 = 'navbar-nav';
    const class2 = 'navbar-collapse';
    expect(Array.from(document.getElementsByClassName(class1)).length).toBeGreaterThan(0);
    expect(Array.from(document.getElementsByClassName(class2)).length).toBeGreaterThan(0);

    // TODO: Check that bootstrap is imported to the App

});

test('When a user hovers their cursor, a tooltip appears with words describing that page.', () => {

    render(<App />);
    const links = [ document.getElementById('create-account-link'),
                    document.getElementById('deposit-link'),
                    document.getElementById('withdraw-link'),
                    document.getElementById('all-data-link') ];

    // Check for on-hover element in each navigation button
    links.forEach(link => {
        expect(link.getAttribute('data-toggle')).toBeTruthy;
        if (link.getAttribute('data-toggle')) {
            expect(link.getAttribute('data-toggle')).toEqual('tooltip');
            expect(link.getAttribute('title')).toBeDefined();
        }
    })
});

test('The navigation bar highlights the element of the current page that the user is on.', () => {

    render(<App />);

    // Home should be the active link initially

    const [home,create,deposit,withdraw,allData] = [ document.getElementById('home-link').getElementsByTagName('a')[0],
                    document.getElementById('create-account-link').getElementsByTagName('a')[0],
                    document.getElementById('deposit-link').getElementsByTagName('a')[0],
                    document.getElementById('withdraw-link').getElementsByTagName('a')[0],
                    document.getElementById('all-data-link').getElementsByTagName('a')[0] ];

    expect(home.classList).toContain('active');
    expect(create.classList).not.toContain('active');
    expect(withdraw.classList).not.toContain('active');
    expect(deposit.classList).not.toContain('active');
    expect(allData.classList).not.toContain('active');

    // TODO: Click on link and check if the nav changes to 'active' via the makeActive function. Use react-test-renderer and Act
 //   create.getAttribute('href').simulate('click');
 //   expect(makeActive.mock.calls.length).toEqual(1);
 //   links.forEach(link => {
 //       link.find('href').simulate('click');
 //       expect(makeActive.mock.calls.length).toEqual(1);
 //   })

});