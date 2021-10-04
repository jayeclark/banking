# Specification
Grading rubric for React final project, converted into a checklist. Based on grading rubric, instructions, and user stories.

## GENERAL REQUIREMENTS
List of the basic requirements for the project.

### 0. STRUCTURE & DESIGN
Create a functioning React banking front-end app with a navigation bar and the following components: Home, Create Account, Withdraw, Deposit, All Data.

**Basic Requirements**
- [ ] Use create-react-app to set up files and folders
- [ ] Require/import an external form library using package.json and npm install
- [ ] Edit index.html including meta description, title, and favicon, to form template bank website in which app will be displayed
- [ ] Save components to different .js files either as they are created or via refactoring

**Advanced Options**
- [ ] Plan out and assign functional component and variable/props names before writing any code
- [ ] Write tests to check the functionality required in the specification before writing any code
- [ ] Deploy app to a GitHub pages branch so it's live on github.io

### 1. HOME PAGE
The application must include a Home page.

**Meets Expectations** (5 pts)
- [ ] Includes:
  - [ ] Bootstrap card styling
  - [ ] Bank title image
  - [ ] Welcome message

### 2. NAVIGATION
The application must include a navigation bar with specific functionality.

**Meets Expectations** (10 pts)
- [ ] Includes:
  - [ ] Create Account link
  - [ ] Deposit link
  - [ ] Withdraw link
  - [ ] All Data link
- [ ] When selected, each element on the navigation bar displays the correct page
- [ ] Navigation bar is styled with Bootstrap

**Excellent** (5 addl pts)
- [ ] When a user hovers their cursor over a navigation bar element, they see a few words describing that page
- [ ] The navigation bar highlights the element of the current page the user is on

### 3. CREATE ACCOUNT
The application must include a Create Account page.

**Meets Expectations** (5 pts)
- [ ] Includes a bootstrap card with a form
- [ ] Form includes: 
  - [ ] Name input field
  - [ ] Email input field
  - [ ] Password input field
  - [ ] "Create Account" button

### 4. CREATE ACCOUNT FUNCTIONALITY
The Create Account page must include specific functionality.

**Meets Expectations** (6 pts)  
- [ ] Upon selecting the "Create Account" button, the user should:
  - [ ] See a success message
  - [ ] See an "Add Another Account" button
  - [ ] Be able to open a cleared "Create Account" form when clicking "Add Another Account" or clicking "Create Account" a second time

**Excellent** (4 addl pts, 1 per item)
- [ ] The user receives an alert if: 
  - [ ] Name field is left blank
  - [ ] Email field is left blank
  - [ ] Password is less than 8 characters
- [ ] The submit button should appear disabled in case of no input

### 5. DEPOSIT PAGE
The application must include a Deposit page that allows a user to add money to their bank account.

**Meets Expectations** (5 pts)
- [ ] Deposit form is on a bootstrap card
- [ ] Card includes an input field
- [ ] Card includes a "Deposit" button
- [ ] Balance information is displayed above the deposit form on the card

### 6. DEPOSIT PAGE FUNCTIONALITY 
The Deposit page must include specific functionality.

**Meets Expectations** (7 pts)
- [ ] When a user deposits, their balance gets updated
- [ ] When a user completes the Deposit form, they receive a success message confirming their deposit was received.

**Excellent** (3 addl pts, 1 per item)
- [ ] The user receives an alert if they add something that is not a number
- [ ] The user receives an alert if they try to deposit a negative number.
- [ ] The deposit button should appear disabled in case of no input.

### 7. WITHDRAW PAGE
The application must include a Withdraw page that allows users to remove money from their account.

**Meets Expectations** (5 pts)
- [ ] Includes a bootstrap card
- [ ] Card has a withdraw input field
- [ ] Card has a "Submit" button
- [ ] Balance information displayed above the withdrawal form.

### 8. WITHDRAW PAGE FUNCTIONALITY
The Withdraw page must include specific functionality.

**Meets Expectations** (7 pts)
- [ ] When a user submits the withdrawal form, the number is subtracted from the total balance
- [ ] When a user submits the withdrawal form, they receive a success message confirming that their withdrawal was processed.

**Excellent** (3 addl pts, 1 per item)
- [ ] When a user withdraws a number higher than the account balance, the user receives an alert message on the Withdraw page.
- [ ] User receives an alert if they add something that is not a number.
- [ ] The deposit (*Note: I think they meant 'Submit'*) button should appear disabled in case of no input.

### 9. ALL DATA PAGE
This page displays a history of deposits and withdrawals from the account (similar to how an account details page would in a real banking application.) This means that your banking application will need to keep track of user actions.

**Meets Expectations** (8 pts)
- [ ] Track user submissions
- [ ] All user submissions appear on the All Data page

**Excellent** (2 addl pts)
- [ ] All data is styled and displayed on a Bootstrap card
