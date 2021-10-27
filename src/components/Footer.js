import React from 'react';
import { useContext} from "react";
import LanguageContext from "../helpers/LanguageContext";
import languages from "../data/languages";
import '../styles/Footer.css';

function Footer() {

    // Get language and import data
    const { language } = useContext(LanguageContext);
    const data = languages[language]

    // Get items
    const {links: footerLinks, connectCTA, memberFDIC, rightsReserved} = data.components.footer;

    return (
        <div className="footer-container">
            <div className="footer-links">
                {footerLinks.map((link,i) => <div key={i} className="link-container">{i !== 0 ? <div className="divider"></div> : null}<div className="fake-link">{link}</div></div>)}
            </div>
            <div className="footer-social">
                <div id="globalSocialModule">
                    <div className="social">
                        <h5 className="social-header">{connectCTA}</h5>
                        <a href="https://www.facebook.com/BankofAmerica/" rel="noopener noreferrer" target="_blank" id="social_follow_facebook_link" className="social-network">
                            <svg focusable="false" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"><g><path d="M28.345,0H1.656A1.656,1.656,0,0,0,0,1.656V28.344A1.655,1.655,0,0,0,1.656,30H28.345A1.655,1.655,0,0,0,30,28.344V1.656A1.656,1.656,0,0,0,28.345,0" fill="#fff"></path><path d="M24.6,18.383l0.584-4.527H20.7V10.965c0-1.311.364-2.205,2.244-2.205h2.4V4.709a32.181,32.181,0,0,0-3.492-.178c-3.457,0-5.824,2.109-5.824,5.984v3.34H12.115v4.527h3.908V30H20.7V18.383h3.9Z" fill="#012169"></path></g></svg>
                        </a>
                        <a href="https://www.instagram.com/bankofamerica/" rel="noopener noreferrer"  target="_blank" id="social_follow_instagram_link" className="social-network">
                            <svg focusable="false" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"><path d="M26.539,12.69H23.927a9.23,9.23,0,1,1-17.854,0H3.461v12.7a1.154,1.154,0,0,0,1.154,1.152H25.384a1.154,1.154,0,0,0,1.155-1.152V12.69Zm0-8.075a1.153,1.153,0,0,0-1.155-1.153H21.923A1.153,1.153,0,0,0,20.77,4.614V8.076A1.154,1.154,0,0,0,21.923,9.23h3.461a1.154,1.154,0,0,0,1.155-1.153V4.614ZM15,9.23A5.77,5.77,0,1,0,20.77,15,5.769,5.769,0,0,0,15,9.23M26.539,30H3.461A3.462,3.462,0,0,1,0,26.537V3.461A3.461,3.461,0,0,1,3.461,0H26.539A3.461,3.461,0,0,1,30,3.461V26.537A3.462,3.462,0,0,1,26.539,30" fill="#fff" fillRule="evenodd"></path></svg>
                        </a>
                        <a href="https://www.linkedin.com/company/bank-of-america" rel="noopener noreferrer"  target="_blank" id="social_follow_linkedin_link" className="social-network">
                            <svg focusable="false" xmlns="http://www.w3.org/2000/svg" width="30.001" height="30" viewBox="0 0 30.001 30"><g><path d="M27.781,0H2.215A2.188,2.188,0,0,0,0,2.16V27.836A2.191,2.191,0,0,0,2.215,30H27.781A2.2,2.2,0,0,0,30,27.836V2.16A2.192,2.192,0,0,0,27.781,0Z" fill="#fff"></path><path d="M4.448,11.246H8.9V25.563H4.448V11.246ZM6.674,4.129a2.58,2.58,0,1,1-2.58,2.58,2.58,2.58,0,0,1,2.58-2.58" fill="#012169"></path><path d="M11.689,11.246h4.268V13.2h0.06a4.681,4.681,0,0,1,4.21-2.311c4.506,0,5.338,2.965,5.338,6.82v7.852H21.118V18.6c0-1.658-.031-3.795-2.314-3.795-2.314,0-2.669,1.809-2.669,3.676v7.082H11.689V11.246Z" fill="#012169"></path></g></svg>
                        </a>
                        <a href="https://twitter.com/BankofAmerica" target="_blank" rel="noopener noreferrer"  id="social_follow_twitter_link" className="social-network">
                            <svg focusable="false" xmlns="http://www.w3.org/2000/svg" width="36.914" height="30" viewBox="0 0 36.914 30"><path d="M36.914,3.551a15.169,15.169,0,0,1-4.35,1.193A7.6,7.6,0,0,0,35.9.553a15.187,15.187,0,0,1-4.811,1.838A7.582,7.582,0,0,0,18.18,9.3,21.5,21.5,0,0,1,2.57,1.387,7.579,7.579,0,0,0,4.914,11.5a7.542,7.542,0,0,1-3.432-.946v0.095A7.577,7.577,0,0,0,7.559,18.07a7.621,7.621,0,0,1-3.422.131,7.587,7.587,0,0,0,7.076,5.26,15.194,15.194,0,0,1-9.4,3.241A15.57,15.57,0,0,1,0,26.6,21.439,21.439,0,0,0,11.609,30c13.93,0,21.549-11.541,21.549-21.549q0-.492-0.023-0.981A15.394,15.394,0,0,0,36.914,3.551Z" fill="#fff"></path></svg>
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                <p className="legal-text">Bad Bank of America, N.A. {memberFDIC}</p>
                <p className="legal-text">©&nbsp;<span id="dynamic-copyright-year-update">2021</span>&nbsp;Bad Bank of America Corporation. <span>{rightsReserved}</span></p>
            </div>

        </div>
    )
}

export default Footer;