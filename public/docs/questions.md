# Questions 

## General
* Several times in the instructions, grading rubric, and user stories, the term 'alert' is used. Does this need to specifically be an alert? (i.e. called using ```alert()``` or can we create our own pop up notifications within our app? (These have some big advantages in terms of more flexible styling, timing, and positioning... but if our apps are going to be subjected to a testing suite that specifically is looking for alerts, custom notifications might cause them to fail that test.)  
  
*Answer from Selga: This will be graded by the grading team. I'd encourage you to create your own notifications if you'd like (as long as you are meeting the expectations of the rubric and demonstrating an understanding of the content).*

## Navigation
* The [Gradic Rubric](https://github.com/jayeclark/banking/blob/main/public/docs/Grading%20Rubric.pdf) **Navigation** section and [Instructions](https://github.com/jayeclark/banking/blob/main/public/docs/instructions.md) **1. Navigation** section call for "Hover effect: when a user hovers their cursor over a navigation bar element, they see a few words describing that page. The [Banking Application User Stories](https://github.com/jayeclark/banking/blob/main/public/docs/Banking%20Application%20User%20Stories.xlsx) **Navigation** section, on the other hand, calls for a "changing color hover effect over each of the separate links." Which one is the desired behavior?  
  
*Answer from Selga: I would defer to the grading rubric when you are unsure of the requirements. The navigation bar should include at least one creative styling, such as: - Hover effect: When a user hovers their cursor over a navigation bar element, they see a few words describing that page; - Highlighting: The navigation bar highlights the element of the current page the user is on*

## Homepage
* The [Gradic Rubric](https://github.com/jayeclark/banking/blob/main/public/docs/Grading%20Rubric.pdf) **Create Account Page** section and [Instructions](https://github.com/jayeclark/banking/blob/main/public/docs/instructions.md) **3. Create Account Page** call for a 'bank title' without explaining what that means -- the [Banking Application Homepage Wireframe](https://github.com/jayeclark/banking/blob/main/public/docs/Banking%20Application%20Homepage.pdf) seems to indicate that this means that the bootstrap card for the homepage should be styled to have a title (bank title), content (welcome message), and image in order to receive full credit. Is this the correct interpretation?  
  
*Answer from Selga: Correct, the Home Page should include a Bootstrap card with the following: Bank title, Image, Welcome message.*

## Create Account
* The [Gradic Rubric](https://github.com/jayeclark/banking/blob/main/public/docs/Grading%20Rubric.pdf) **Create Account Page** section and [Instructions](https://github.com/jayeclark/banking/blob/main/public/docs/instructions.md) **3. Create Account Page** calls for a 'Create Account' button, while the [Banking Application User Stories](https://github.com/jayeclark/banking/blob/main/public/docs/Banking%20Application%20User%20Stories.xlsx) **Create Account** section calls for a 'Submit' button. Should the button text say 'Create Account', or 'Submit'?  
  
*Answer from Selga: I think having a "Create Account" button would provide a better user experience (this is also the language used on the wire frames). It is possible that the "submit" they are referring to is the button type="submit" (I am not 100% sure if this is something that has been covered in class content before I joined, please let me know if you want to discuss this further).
https://www.w3schools.com/tags/att_button_form.asp (Links to an external site.)*
  
## Deposit Page
* The [Banking Application User Stories](https://github.com/jayeclark/banking/blob/main/public/docs/Banking%20Application%20User%20Stories.xlsx)  **Deposit** section calls for the deposit button to be enabled for negative deposit amounts, and for an alert message to pop up on submission that prompts the user to only enter positive amounts. The [Gradic Rubric](https://github.com/jayeclark/banking/blob/main/public/docs/Grading%20Rubric.pdf) **Deposit Page Functionality** section and [Instructions](https://github.com/jayeclark/banking/blob/main/public/docs/instructions.md) **6. Deposit Page Functionality** have the more general instruction that the user should receive an alert when a user tries to deposit a number higher than the account balance (which could be accomplished through input validation and by disabling the deposit button until a valid amount is entered.) Is the more specific behavior in the user story the desired behavior?  
  
*Answer from Selga: I would focus on the functionality listed in the instructions (6. Deposit Page Functionality).*
* The [Banking Application User Stories](https://github.com/jayeclark/banking/blob/main/public/docs/Banking%20Application%20User%20Stories.xlsx)  **Deposit** section says "If I type something that is not a number into the input box, I receive an alert that prompts me to enter numerical values only" (i.e. the alert behavior takes place prior to form submission). Are we supposed to take the term 'alert' literally (i.e. call ```alert()``` within our application)? Or can we accomplish this through input validation/disabled deposit button?   
   
*Answer from Selga: In this case, it does not need to be an alert() but some sort of notification/alert/visual cue to the user. Yes, this can be accomplished with input validation/disabled deposit button.*
  
## 7. Withdraw Page
* The [Banking Application User Stories](https://github.com/jayeclark/banking/blob/main/public/docs/Banking%20Application%20User%20Stories.xlsx)  **Withdraw** section calls for the withdraw button to be enabled for withdrawal accounts higher than the bank balance, and for a 'transaction failed' message to pop up on submission. The [Gradic Rubric](https://github.com/jayeclark/banking/blob/main/public/docs/Grading%20Rubric.pdf) **Withdraw Page Functionality** section and [Instructions](https://github.com/jayeclark/banking/blob/main/public/docs/instructions.md) **8. Withdraw Page Functionality** have the more general instruction that the user should receive an alert on the withdraw page when a user withdraws a number higher than the account balance (which could be accomplished through input validation and by disabling the withdraw button until a valid amount is entered.) Is the more specific behavior in the user story the desired behavior?  
  
*Answer from Selga: I would focus on the functionality listed in the instructions (8. Withdraw Page Functionality).*

## 9. All Data Page Functionality
* Can we get some clarity on what user submissions in The [Gradic Rubric](https://github.com/jayeclark/banking/blob/main/public/docs/Grading%20Rubric.pdf) **Withdraw Page Functionality** section and [Instructions](https://github.com/jayeclark/banking/blob/main/public/docs/instructions.md) **8. Withdraw Page Functionality** means? I assumed this meant 'user deposit & withdrawal submissions' and built my app accordingly. However, the [Banking Application User Stories](https://github.com/jayeclark/banking/blob/main/public/docs/Banking%20Application%20User%20Stories.xlsx)  **All Data** section and the [Banking Application All Data Wireframe](https://github.com/jayeclark/banking/blob/main/public/docs/Banking%20Application%20All%20Data%20Page.pdf) seem to want usernames, emails, and passwords to be displayed (this doesn't make a ton of sense from the perspective of a single end-user...)  I just want to check that this is the required functionality. If so, what should be displayed if no user info has been entered?  
  
*Answer from Selga: I hope I am understanding this question correctly. I think the "All Data Page" should be displaying any form submissions from the "Create Account Page". The "Withdraw Page" is the page that should have all the functionality listed in the Instructions 8. Withdraw Page Functionality.*

# Typos
* The [Banking Application User Stories](https://github.com/jayeclark/banking/blob/main/public/docs/Banking%20Application%20User%20Stories.xlsx)  **Deposit** section has been copied from Withdraw, and lines 21 - 25 keep referencing the "Withdraw" button.
* The  [Instructions](https://github.com/jayeclark/banking/blob/main/public/docs/instructions.md) **4. Withdraw Page Functionality** section and  [Gradic Rubric](https://github.com/jayeclark/banking/blob/main/public/docs/Grading%20Rubric.pdf) **Withdraw Page Functionality** section include an instruction to "Disable deposit button" (should read 'Withdraw')
