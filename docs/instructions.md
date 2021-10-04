## URL Submission
You are tasked with submitting your website's URL.  
  
You can choose where to host your website, but we can provide support if you use Amazon S3 with static website hosting.  
  
Regardless of the method you've chosen to host your website, please use the following naming convention as part of your URL:  
  
Firstname-LastnameBankingApplication  
  
If you have elected to use Amazon S3, the name you choose for the Amazon S3 bucket will be part of your website's URL. So, when you create and name your Amazon S3 bucket, use the previously mentioned naming convention.  
  
## Deployment
### Deployment For React Standalone 
  
If you’re using the standalone version of the app (not create-react-app), you can still deploy your application to an S3 bucket. The same rules still apply, you have to upload all your application files to the bucket and make it publicly accessible.   
  
You can make your S3 bucket publicly accessible by following these steps:   
  
* Go to your S3 bucket and locate the “Permissions” tab.  
* Once on that tab, scroll down to the “Bucket Policy” section and click “edit”   
* Paste the following JSON into the box, making sure you change FIRSTNAME_LASTNAMEBANKINGAPP to your actual bucket name:   
``` 
  {
     
        "Version": "2008-10-17",

    "Statement": [

        {

            "Sid": "AllowPublicRead",

            "Effect": "Allow",

            "Principal": {

                "AWS": "*"

            },

            "Action": "s3:GetObject",

            "Resource": "arn:aws:s3:::FIRSTNAME_LASTNAMEBANKINGAPP/*"

        }

    ]

} 
```
* Click save.  
   
Your bucket should now be publicly accessible.

### Create-React-App

In the Deploy Static Website On Amazon S3 in Week 20, Dr. Williams will show you how to deploy a create-react-app on S3. You can follow those instructions if you decide to refactor your banking application with create-react-app.  
  
You can learn how to configure an Amazon S3 bucket for static website hosting here (Links to an external site.).  

## Website Functionality
Your website should include the following functionality. Please review the rubric below for specific information on how each element will be graded.  

### 1. Navigation Bar
* 1.1 Includes Create Account, Deposit, Withdraw, All Data, and Home pages
* 1.2 Routing: Each navigation bar item routes the user to the relevant page. For example, by selecting Home the user should be directed to the Home page. 
* 1.3 Styled with Bootstrap
* 1.4 Highlighting: Each navigation bar item is highlight when you are on that page. For example, Home is highlighted when you are on the home page. 
* 1.5 Hover effect: When your mouse hovers over a navigation bar item, you see a pop up with a description of that page.

### 2. Home Page
* 2.1 Includes bank title, image, and a welcome message. 
* 2.2 Styled as a Bootstrap card. 

### 3. Create Account Page
* 3.1 Includes a Bootstrap card with a form that has:
* 3.2 Name input field
* 3.3 Email address input field
* 3.4 Password input field
* 3.5 Create account button

### 4. Create Account Page Functionality
Create account page should include the following functionality:
* 4.1 Success message: Upon selecting the create account button the user should see a success message. 
* 4.2 Add Another Account Button: Upon selecting the create account button, the user should see an add another account button. 
* 4.3 Cleared Create Account Form: Upon selecting the create account button, t will open a cleared create account form.
* 4.4 Name validation: The user receives an alert if the name field is left blank. 
* 4.5 Email validation: The user receives an alert if this field is blank 
* 4.6 Password validation: The user receives an alert if the password is less than 8 characters long. 
* 4.7 Disable submit button if nothing is inputted

### 5. Deposit Page
* 5.1 Includes a Bootstrap card with a form that has:
* 5.2 Deposit input field 
* 5.3 Deposit button 
* 5.4 Balance information displays above deposit form on the card

### 6. Deposit Page Functionality
Deposit page should include the following functionality:
* 6.1 Updated Balance: When a user deposits, the balance updates. 
* 6.2 Success Message: When a user completes the deposit form, they receive a success message confirming their deposit was received. 
* 6.3 Not A Number Alert: User receives an alert if they add something that is not a number. 
* 6.4 Negative Deposit Alert: User receives an alert if they try to deposit a negative number.
* 6.5 Disable deposit button if nothing is input

### 7. Withdraw Page
Includes a Bootstrap card with a form that has:
* 7.1 Withdraw input field 
* 7.2 Withdraw button 
* 7.3 Balance information displays above deposit form on the card

### 8. Withdraw Page Functionality
Withdraw page should include the following functionality:
* 8.1 Updated Balance: When a user completes the withdrawal form, the number submitted is subtracted from the total balance. 
* 8.2 Success Message: When a user completes the withdrawal form, they receive a success message confirming that their withdraw was processed. 
* 8.3 Account Overdraft Feature: When a user withdraws a number higher than the account balance, the user receives an alert message on the withdraw page.
* 8.4 Not A Number Alert: User receives an alert if they add something that is not a number. 
* 8.5 Disable deposit button if nothing is input

### 9. All Data Page Functionality
All Data page includes the following functionality:
* 9.1 Track User Submissions: All user submissions appear on All Data page.
* 9.2 All Data Displayed On Bootstrap Card: All Data is styled and displayed on a Bootstrap card instead of JSON.

## Submission Instructions:
* Upload the link to your front end banking application website
* The url should include your first name and last name
* Note that the site should be deployed on a cloud service, like AWS3
