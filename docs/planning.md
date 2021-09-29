# DESIGN
Notes on the specific design, functional components, file structure, variable naming, and stateful logic.

## FILE STRUCTURE
The /src directory is organized into: assets, components, data, helpers, pages, styles, and tests. 

## PAGES

**Home.html**  
Static home page with bootstrap card styling, an image, and a welcome message. There will be a spanish and german version too available in subfolders.  
  
**Footer.html**  
Static footer. Separated into its own file for ease of reading the code. There will be a spanish and german version too available in subfolders.  
  
**LoggedIn.html**  
Static boilerplate to show after account creation/login. Most items are not clickable, it's just boilerplate to look more interesting than a blank page. There will be a spanish and german version too.  
  
**CreateAccount.js**  
Component screen with boostrap card styling and a form to create an account. LoggedIn should be passed to this component as it should not display if the user is not logged in. FormType should also be passed. Sitedata should be passed for language rendering purposes.  
  
**Deposit.js**  
Component screen that mimics depositing a check. LoggedIn, Balance and setBalance, and formType should be passed to this component. Sitedata should be passed for language rendering purposes.  
  
**Withdraw.js**  
Component screen that mimics requesting a withdrawal or transferring to an external account. LoggedIn, Balance and setBalance, and formType should be passed to this component. Sitedata should be passed for language rendering purposes.  
  
**AllData.hs**   
Component screen that mimics the account view option in banking websites. TxnData and setTxnData should be passed to this component. Sitedata should be passed for language rendering purposes.  
  
## COMPONENTS
**AppNav.js**  
This component provides the navigation in the bad banking app  
  
**Card.js**  
A basic card component for displaying the withdrawal, deposit, alldata, and create account ui's. Props passed to the card include styling details, formType, fields, and validation. 
  
**FormFormik.js**  
A form component built using the Formik library. Forms generate automatically based on the props passed to the component.  
  
**FormReactHook.js**  
A form component built using the react-hook-form library. Forms generate automatically based on the props passed to the component.  
  
**FormReactFinal.js**  
A form component built using the react-final-form library. Forms generate automatically based on the props passed to the component.  
  
**Notification.js**
A component to pop up a window with a notification of success or failure, and a progress bar.  
  
**OptionsNav**
A component with some toggling options to display the app using different languages and types of forms.
  
## STATE VARIABLES
The following variables (other than those in forms) have the ability to trigger a re-render:
* loggedIn - if the user is logged in, the deposit/withdrawal/allData options show. If not, the home page shows.
* formType - allows toggling among the different form options
* language - allows toggling among different languages
* balance - triggers a rerender of components involving balance when changed
* hasCreatedAccount - changes the text of the create account navigation after an account has been created
* appPage - controls which page/component shows on the screen
* page - controls which page is visible when paginated data is shown

## OTHER VARIABLES
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

**transactions** 
All transaction data with information on the user and the account to which the transaction relates as well as cleared/pending status. Properties:
* txnNum: number
* txnTitle: string
* txnDetails: string
* txnNickname: string
* txnTime: datetime
* txnClearTime: datetime
* accountNum: number
* debit: float
* credit: float
* txnStatus: number
* currency: string
* convertRate: float
* convertTime: datetime
