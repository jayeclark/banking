# Specification
Grading rubric for React final project, converted into a specification.

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

## 1. HOME PAGE
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

## 3. CREATE ACCOUNT
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

## DESIGN
Notes on the specific design, functional components, file structure, variable naming, and stateful logic.

### FILE STRUCTURE
The /src directory is organized into: assets, components, data, helpers, pages, styles, and tests. 

### PAGES

**Home.html**
Static home page with bootstrap card styling, an image, and a welcome message.

**Footer.html**
Static footer. Separated into its own file for ease of reading the code

**LoggedIn.html**
Static boilerplate to show after account creation/login. Most items are not clickable, it's just boilerplate to look more interesting than a blank page.

**CreateAccount.js**
Component screen with boostrap card styling and a form to create an account.

**Deposit.js**
Component screen that mimics depositing a check.

**Withdraw.js**
Component screen that mimics requesting a withdrawal or transferring to an external account.

**AllData.hs** 
Component screen that mimics the account view option in banking websites.

### COMPONENTS
**AppNav.js**
This component provides the navigation in the bad banking app

**Card.js**
A basic card component for displaying the withdrawal, deposit, alldata, and create account ui's.

**FormFormik.js**
A form component built using the Formik library. Forms generate automatically based on the props passed to the component.

**FormReactHook.js**
A form component built using the react-hook-form library. Forms generate automatically based on the props passed to the component.

**FormReactFinal.js**
A form component built using the react-final-form library. Forms generate automatically based on the props passed to the component.

### STATE VARIABLES
The following variables (other than those in forms) have the ability to trigger a re-render:
* loggedIn - if the user is logged in, the deposit/withdrawal/allData options show. If not, the home page shows.
* formType - allows toggling among the different form options
* language - allows toggling among different languages
* balance - triggers a rerender of components involving balance when changed
* hasCreatedAccount - changes the text of the create account navigation after an account has been created
* appPage - controls which page/component shows on the screen
* page - controls which page is visible when paginated data is shown

### OTHER VARIABLES
These variables are stored in the browser's heap but do not necessarily trigger re-renders.

**users** 
Stores the username/password/email of accounts, and their account numbers. Properties: 
* userName: string 
* firstName: string
* middleName: string
* lastName: string
* passWord: string
* email: string
* status: number
* accounts: array

**accounts** 
Stores the bank accounts, their types and the users they are associated with. Properties:
* accountNumber: number
* acountNickname: string
* accountOwner: number
* accountType: string
* status: number
* accountCreatedTime: datetime

**transactionData** 
All transaction data with information on the user and the account to which the transaction relates as well as cleared/pending status. Properties:
* txnNum: number
* txnTime: datetime;
* txnClearTime: datetime;
* accountNum: number
* debit: float
* credit: float
* txnStatus: number
* currency: string
* convertRate: float
* convertTime: datetime
