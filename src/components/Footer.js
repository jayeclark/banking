import { useContext } from "react";
import LanguageContext from "../helpers/LanguageContext";
import languages from "../data/languages";
import '../styles/footer.css';

function Footer() {

    // Get language and import data
    const { language } = useContext(LanguageContext);
    const data = languages[language]

    // Get items
    const {links: footerLinks} = data.components.footer;

    return (
        <div className="footer-container">
            <div className="footer-links">
                {footerLinks.map((link,i)=> i === 0 ? <div className="fake-link">{link}</div> : <><div className="divider"></div><div className="fake-link">{link}</div></>)}
            </div>
            <div className="footer-social">
                <div id="globalSocialModule">
                    <div class="social">
                        <h5 class="social-header">Connect with us</h5>
                        <a href="javascript:void(0);" id="social_follow_facebook_link" class="social-network">
                            <svg focusable="false" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"><g><path d="M28.345,0H1.656A1.656,1.656,0,0,0,0,1.656V28.344A1.655,1.655,0,0,0,1.656,30H28.345A1.655,1.655,0,0,0,30,28.344V1.656A1.656,1.656,0,0,0,28.345,0" fill="#fff"></path><path d="M24.6,18.383l0.584-4.527H20.7V10.965c0-1.311.364-2.205,2.244-2.205h2.4V4.709a32.181,32.181,0,0,0-3.492-.178c-3.457,0-5.824,2.109-5.824,5.984v3.34H12.115v4.527h3.908V30H20.7V18.383h3.9Z" fill="#012169"></path></g></svg>
                        </a>
                        <a href="javascript:void(0);" id="social_follow_instagram_link" class="social-network">
                            <svg focusable="false" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"><path d="M26.539,12.69H23.927a9.23,9.23,0,1,1-17.854,0H3.461v12.7a1.154,1.154,0,0,0,1.154,1.152H25.384a1.154,1.154,0,0,0,1.155-1.152V12.69Zm0-8.075a1.153,1.153,0,0,0-1.155-1.153H21.923A1.153,1.153,0,0,0,20.77,4.614V8.076A1.154,1.154,0,0,0,21.923,9.23h3.461a1.154,1.154,0,0,0,1.155-1.153V4.614ZM15,9.23A5.77,5.77,0,1,0,20.77,15,5.769,5.769,0,0,0,15,9.23M26.539,30H3.461A3.462,3.462,0,0,1,0,26.537V3.461A3.461,3.461,0,0,1,3.461,0H26.539A3.461,3.461,0,0,1,30,3.461V26.537A3.462,3.462,0,0,1,26.539,30" fill="#fff" fill-rule="evenodd"></path></svg>
                        </a>
                        <a href="javascript:void(0);" id="social_follow_linkedin_link" class="social-network">
                            <svg focusable="false" xmlns="http://www.w3.org/2000/svg" width="30.001" height="30" viewBox="0 0 30.001 30"><g><path d="M27.781,0H2.215A2.188,2.188,0,0,0,0,2.16V27.836A2.191,2.191,0,0,0,2.215,30H27.781A2.2,2.2,0,0,0,30,27.836V2.16A2.192,2.192,0,0,0,27.781,0Z" fill="#fff"></path><path d="M4.448,11.246H8.9V25.563H4.448V11.246ZM6.674,4.129a2.58,2.58,0,1,1-2.58,2.58,2.58,2.58,0,0,1,2.58-2.58" fill="#012169"></path><path d="M11.689,11.246h4.268V13.2h0.06a4.681,4.681,0,0,1,4.21-2.311c4.506,0,5.338,2.965,5.338,6.82v7.852H21.118V18.6c0-1.658-.031-3.795-2.314-3.795-2.314,0-2.669,1.809-2.669,3.676v7.082H11.689V11.246Z" fill="#012169"></path></g></svg>
                        </a>
                        <a href="javascript:void(0);" id="social_follow_pinterest_link" class="social-network">
                            <svg focusable="false" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"><g><path d="M30,15A15,15,0,1,1,15,0,15,15,0,0,1,30,15" fill="#fff"></path><path d="M14.982,1.664a13.335,13.335,0,0,0-4.859,25.754,12.789,12.789,0,0,1,.045-3.826c0.242-1.04,1.564-6.629,1.564-6.629a4.8,4.8,0,0,1-.4-1.979c0-1.856,1.076-3.239,2.414-3.239a1.675,1.675,0,0,1,1.688,1.878c0,1.144-.729,2.855-1.106,4.44A1.938,1.938,0,0,0,16.3,20.475c2.371,0,4.193-2.5,4.193-6.107a5.265,5.265,0,0,0-5.57-5.426A5.772,5.772,0,0,0,8.9,14.729,5.186,5.186,0,0,0,9.9,17.772a0.4,0.4,0,0,1,.092.383c-0.1.422-.326,1.327-0.369,1.513-0.058.244-.193,0.3-0.447,0.179-1.666-.775-2.707-3.211-2.707-5.166,0-4.207,3.057-8.07,8.813-8.07,4.627,0,8.221,3.3,8.221,7.7,0,4.6-2.9,8.295-6.92,8.295a3.568,3.568,0,0,1-3.057-1.531s-0.668,2.547-.83,3.17a14.828,14.828,0,0,1-1.658,3.5A13.337,13.337,0,1,0,14.982,1.664Z" fill="#012169"></path></g></svg>
                        </a>
                        <a href="javascript:void(0);" id="social_follow_twitter_link" class="social-network">
                            <svg focusable="false" xmlns="http://www.w3.org/2000/svg" width="36.914" height="30" viewBox="0 0 36.914 30"><path d="M36.914,3.551a15.169,15.169,0,0,1-4.35,1.193A7.6,7.6,0,0,0,35.9.553a15.187,15.187,0,0,1-4.811,1.838A7.582,7.582,0,0,0,18.18,9.3,21.5,21.5,0,0,1,2.57,1.387,7.579,7.579,0,0,0,4.914,11.5a7.542,7.542,0,0,1-3.432-.946v0.095A7.577,7.577,0,0,0,7.559,18.07a7.621,7.621,0,0,1-3.422.131,7.587,7.587,0,0,0,7.076,5.26,15.194,15.194,0,0,1-9.4,3.241A15.57,15.57,0,0,1,0,26.6,21.439,21.439,0,0,0,11.609,30c13.93,0,21.549-11.541,21.549-21.549q0-.492-0.023-0.981A15.394,15.394,0,0,0,36.914,3.551Z" fill="#fff"></path></svg>
                        </a>
                        <a href="javascript:void(0);" id="social_follow_youtube_link" class="social-network">
                            <svg focusable="false" xmlns="http://www.w3.org/2000/svg" width="29.999" height="30" viewBox="0 0 29.999 30"><g><path d="M4.3,4.438a173.048,173.048,0,0,1,21.4,0,4.266,4.266,0,0,1,3.973,3.971,59.594,59.594,0,0,1,0,12.518A4.271,4.271,0,0,1,25.7,24.9a171.763,171.763,0,0,1-21.4,0A4.245,4.245,0,0,1,.33,20.926a59.591,59.591,0,0,1,0-12.518A4.259,4.259,0,0,1,4.3,4.438h0Z" fill="#fff" fill-rule="evenodd"></path><polygon points="11.912 10.393 19.908 14.584 11.912 18.721 11.912 10.393 11.912 10.393" fill="#012169" fill-rule="evenodd"></polygon></g></svg>
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                <p class="legal-text">Bad Bank of America, N.A. Member FDIC.</p>
                <p class="legal-text">©&nbsp;<span id="dynamic-copyright-year-update">2021</span>&nbsp;Bad Bank of America Corporation. <span>All rights reserved.</span></p>
            </div>

        </div>
    )
}


export default Footer;