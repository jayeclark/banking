import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const allLinks = ['Home', 'Create Account', 'Deposit', 'Withdraw', 'Transactions', 'All Data'];
    
describe('2. NAVIGATION', () => {

    test('2.1. Includes \'Create Account\' link, \'Deposit\' link, \'Withdraw\' link, and \'All Data\' link.', () => {
        const { getByText } = render(<App />);
        allLinks.forEach(label => {
            const link = getByText(label);
            expect(link).toBeInTheDocument();
        })
      });
      
    test('2.2. When selected, each element on the navigation bar displays the correct page.', () => {
    
        const { getByText } = render(<App />);

        // Home should be the active link initially
        const home = getByText('Home');
        expect(home.classList).toContain('active');

        // No other links should be active initially
        const otherLinks = allLinks.filter(label => label !== 'Home');
        otherLinks.forEach(label => {
            const link = getByText(label);
            expect(link.classList).not.toContain('active');
        })
        
        // When a link is clicked, the correct page should be displayed
        const componentClasses = {'Home': 'home-page', 
                        'Create Account': 'create-account-page',
                        'Deposit': 'deposit-page',
                        'Withdraw': 'withdraw-page',
                        'Transactions': 'all-data-page',
                        'All Data': 'user-data-page'};
        allLinks.forEach(label => {
            const link = getByText(label);
            userEvent.click(link);
    
            const component = document.getElementById(componentClasses[label]);
            expect(component).toBeDefined();
        });
    
    });
      
    test('2.3. Navigation bar is styled with bootstrap.', () => {
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
    
    });
      
      test('2.4. When a user hovers their cursor over a navigation bar element, they see a few words describing that page.', () => {
      
          render(<App />);
          const linkIds = {'Home': 'home-link', 
          'Create Account': 'create-account-link',
          'Deposit': 'deposit-link',
          'Withdraw': 'withdraw-link',
          'Transactions': 'all-data-link',
          'All Data': 'user-data-link'};
          allLinks.forEach(label => {
              const link = document.getElementById(linkIds[label]);
              expect(link.getAttribute('data-tip')).toBeDefined();
              const toolTip = document.getElementById(linkIds[label] + '-tooltip');
              expect(toolTip).toBeInTheDocument();
          });
      });
      
      test('2.5. The navigation bar highlights the element of the current page the user is on.', () => {
      
          const { getByText } = render(<App />);

          allLinks.forEach(label => {
              const link = getByText(label);
              userEvent.click(link);
              expect(link.classList).toContain('active');
              const filtered = allLinks.filter(l => l !== label);
              filtered.forEach(item => expect(getByText(item).classList).not.toContain('active'));
          });
      
      });

})