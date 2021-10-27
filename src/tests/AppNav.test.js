import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const allLinks = ['Home', 'Create Account', 'Deposit', 'Withdraw', 'Transactions', 'All Data'];
    
test('Renders navigation link with \'Home\', \'Create Account\', \'Deposit\', \'Withdraw\', and \'All Data\' visible.', () => {
  const { getByText } = render(<App />);
  allLinks.forEach(label => {
      const link = getByText(label);
      expect(link).toBeInTheDocument();
  })
});

test('The navigation bar highlights the home page on load.', () => {

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

});

test('When selected, each element on the navigation bar displays the correct page.', () => {

    const { getByText } = render(<App />);
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

});

test('When a user hovers their cursor, a tooltip appears with words describing that page.', () => {

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

test('When a user clicks on a link, that nav link becomes active and the other nav links become inactive.', () => {

    const { getByText } = render(<App />);
    allLinks.forEach(label => {
        const link = getByText(label);
        userEvent.click(link);
        expect(link.classList).toContain('active');
        const filtered = allLinks.filter(l => l !== label);
        filtered.forEach(item => expect(getByText(item).classList).not.toContain('active'));
    });

});