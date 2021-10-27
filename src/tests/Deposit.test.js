import React from 'react';
import { render } from '@testing-library/react';
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Enzyme, { mount } from "enzyme";
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import UserContext from '../helpers/UserContext';
import UserDBContext from '../helpers/UserDBContext';
import Deposit from '../pages/Deposit';
import App from '../App';

Enzyme.configure({ adapter: new Adapter() });
const pageName = 'Deposit';

describe('Deposit Page', () => {

    test('Includes a bootstrap card.', () => {

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
    
      test('Includes an input field if a user is logged in.', async () => {
    
        const renderedApp = mount(
            <UserDBContext.Provider value={{users: [{ name: 'Jenn', number:1, balance: 0 }]}}>
                <UserContext.Provider value={{loggedInUser: 1}}>
                    <Deposit />
                </UserContext.Provider>
            </UserDBContext.Provider>
        );
    
        const promise = () => {
            return new Promise(resolve => {
                setTimeout(() => {
                    renderedApp.update();
                    resolve(renderedApp);
                }, 1000);
            })
        }

        await act(async () => {
            return promise().then((result) => {
                expect(result.find("input").length).toBeTruthy();
            });
        });
        
      });

      test('Includes a Deposit button if a user is logged in.', async () => {
    
        const renderedApp = mount(
            <UserDBContext.Provider value={{users: [{ name: 'Jenn', number:1, balance: 0 }]}}>
                <UserContext.Provider value={{loggedInUser: 1}}>
                    <Deposit />
                </UserContext.Provider>
            </UserDBContext.Provider>
        );
    
        const promise = () => {
            return new Promise(resolve => {
                setTimeout(() => {
                    renderedApp.update();
                    resolve(renderedApp);
                }, 1000);
            })
        }

        await act(async () => {
            return promise().then((result) => {
                expect(result.find("button").text() === "Deposit").toBeTruthy();
            });
        });
        
      });
    
      test('Does not include an input or Deposit button if a user is not logged in.', async () => {
    
        const renderedApp = mount(
            <UserDBContext.Provider value={{users: [{ name: 'Jenn', number:1, balance: 0 }]}}>
                <UserContext.Provider value={{loggedInUser: null}}>
                    <Deposit />
                </UserContext.Provider>
            </UserDBContext.Provider>
        );
    
        const promise = () => {
            return new Promise(resolve => {
                setTimeout(() => {
                    renderedApp.update();
                    resolve(renderedApp);
                }, 1000);
            })
        }

        await act(async () => {
            return promise().then((result) => {
                expect(result.find("input").length).toBeFalsy();
                expect(result.find("button").length).toBeFalsy();
            });
        });
        
      });
    
})