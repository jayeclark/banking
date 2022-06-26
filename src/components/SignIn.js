import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import axios from 'axios';
import MobileNav from './MobileNav';
import { parseValidation } from '../helpers/library';
import validationFunctions from '../helpers/validation';
import formParser from '../helpers/formParser';
import Card from '../components/Card';
import FormContext from '../helpers/FormContext';
import LanguageContext from '../helpers/LanguageContext';
import NotificationContext from '../helpers/NotificationContext';
import UserContext from '../helpers/UserContext';
import UserDBContext from '../helpers/UserDBContext';
import languages from '../data/languages.js';
import { API_URL } from '../helpers/constants';

export function SignIn() {

        // Get user database, logged in user, form preference, and language
        const { addUser } = useContext(UserDBContext);
        const { logIn } = useContext(UserContext);
        const { form: formProvider } = useContext(FormContext);
        const { language } = useContext(LanguageContext);
        const { displayNotification } = useContext(NotificationContext);
    
        // Load page content
        const { formSubmission, formFields } = languages[language].forms['signIn'];
        const content = null;
     
        const { success, failure } = formSubmission;
        const { successTitle, failureTitle } = languages[language].general;

        // Parse validation functions
        parseValidation(formFields, validationFunctions);
    
        // Add submission instructions
        const submitHelperFunc = async (values) => {
    
            const user = {
                username: values.username,
                password: values.password,
             };
    
            let result;
            try {
                result = await axios.post(`${API_URL}/auth/login`, { ...user });
            } catch (e) {
                console.log(e);
            }
            console.log("RESULT", result);
            if (result.status !== 200) { 
                displayNotification({ title: failureTitle, type: 'failure', text: failure, time: 5000 });
                return 'failure'; }
            else {
                let matchingUser = result.data.value;
                matchingUser.access_token = result.data.access_token;
                matchingUser.refresh_token = result.data.refresh_token;
                addUser(matchingUser);
                logIn(matchingUser.id);
                displayNotification({ title: successTitle, type: 'success', text: success, time: 5000 });
                return 'success';
            }
    
        }
        formSubmission.submitHelper = submitHelperFunc;
    
        // Create form component
        const form = formParser(formProvider, formFields, formSubmission);
    const signInRef = useRef(null);
    const handleShowSignIn = () => {
        if (signInRef.current.classList.contains("expanded")) {
            signInRef.current.classList.remove("expanded");
        } else {
            signInRef.current.classList.add("expanded");
        }
    }
    

    return (
        <>
            <MobileNav handleShowSignIn={handleShowSignIn} />
            <div ref={signInRef} >
            <Card id="sign-in-card" header={null} content={content} form={form}>
                <div className="desktop-options">
                    <div style={{ color: "#fff", fontWeight: 300, fontSize: "0.9rem", textAlign: "left", padding: 4 }}>
                        Forgot ID/Password?
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "#fff", fontWeight: 300, fontSize: "0.9rem", textAlign: "left", padding: 4 }}>
                        <div style={{ paddingRight: 5 }}>Security &amp; Help</div><div>Enroll</div>
                    </div>
                    <div style={{ color: "#fff", margin: "5px -15px -15px -15px", padding: 8, fontWeight: 300, fontSize: "0.9rem", backgroundColor: "rgb(196, 18, 48)"}}>
                        <Link to="/create-account" style={{ color: "#fff", textDecoration: "none" }}>Open an Account</Link>
                    </div>
                    <div style={{ backgroundColor: "#fff", margin: "15px -17px -17px -17px", paddingTop: 15 }}>
                        <div style={{ display: "flex", alignItems: "center", backgroundColor: "rgb(0, 115, 207)", padding: "8px 10px", color: "#fff", fontSize: "0.9rem", fontWeight: 300 }}>
                            <div style={{ padding: 10 }}>
                                <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 151.376 218" width="18" height="26"><path d="M75.661,31.468a35.835,35.835,0,1,0,35.846,35.814A35.807,35.807,0,0,0,75.661,31.468M75.78,218S0,111.691,0,75.693a75.688,75.688,0,1,1,151.376,0c0,48.744-75.6,142.307-75.6,142.307" style={{ fill: "#fff" }}></path></svg>
                            </div>
                            <div style={{ textAlign: "left" }}>Find your closest financial center or ATM</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", backgroundColor: "rgb(0, 82, 194)", padding: 8, color: "#fff", fontSize: "0.9rem", fontWeight: 300 }}>
                            <div style={{ padding: "2px 10px" }}>
                                <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 207.065 199.634" width="20" height="20">
                                    <rect width="207.065" height="199.634" style={{ fill: "#fff" }}></rect>
                                    <rect x="13.601" y="53.376" width="179.862" height="132.657" style={{ fill: "#0052c2" }}></rect>
                                    <path d="M37.127,14.694A12.007,12.007,0,1,1,25.12,26.7,12.013,12.013,0,0,1,37.127,14.694h0Z" style={{ fill: "#0052c2" }}></path>
                                    <path d="M169.951,14.694A12.007,12.007,0,1,1,157.944,26.7a12.015,12.015,0,0,1,12.007-12.007h0Z" style={{ fill: "#0052c2" }}></path>
                                    <path d="M86.989,114.888c11.043,2.391,15,10.632,15,18.525,0,12.483-10.3,22.69-27.588,22.69-7.495,0-17.175-1.247-24.156-5.515l4.165-10.824c10.092,4.358,15.092,4.577,18.1,4.577,10.22,0,13.961-5.721,14.064-10.092,0.206-9.256-6.968-12.483-20.3-12.8v-9.886c13.743-.424,17.484-5.939,17.484-10.837,0-3.535-2.61-6.646-8.318-6.646-3.124,0-8.947.206-19.271,5.734l-4.05-10.516c8.433-4.808,17.278-7.1,23.719-7.1,16.147,0,23.011,8.33,23.011,17.291,0,4.679-2.79,11.866-11.866,15.092v0.309Z" style={{ fill: "#fff" }}></path>
                                    <polygon points="134.476 96.778 119.91 98.128 119.91 88.229 135.813 83.563 149.041 83.563 149.041 155.168 134.476 155.168 134.476 96.778" style={{ fill: "#fff" }}></polygon></svg>
                            </div>
                            <div> Schedule an Appointment</div>
                        </div>
                    </div>
                </div>

                <div className="mobile-options">
                    <div style={{ textAlign: "right", fontSize: "0.95rem", marginBottom: 20, fontWeight: 300, color: "#000" }}>
                        <Link to="/" style={{ color: "rgb(220, 20, 49)", textDecoration: "none" }}>Forgot ID/Password?</Link>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <Link to="/" style={{ color: "rgb(220, 20, 49)", textDecoration: "none" }}>Security &amp; Help</Link>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <Link to="/" style={{ color: "rgb(220, 20, 49)", textDecoration: "none" }}>Enroll</Link>
                    </div>
                    <div style={{ color: "#000", margin: "5px -15px -15px -15px", padding: 8, fontWeight: 300, fontSize: "1rem", backgroundColor: "rgb(220, 220, 220)"}}>
                        <Link to="/create-account" style={{ color: "rgb(220, 20, 49)", textDecoration: "none" }}>Open an Account</Link>
                    </div>
                </div>
            </Card>
            </div>
        </>
    )
    


}