import React, {useContext} from 'react';
import ReactTooltip from 'react-tooltip';
import '../styles/AppNav.css';
import LanguageContext from '../helpers/LanguageContext';
import languages from '../data/languages.js';

function AnonNav() {
    
    // Get language preference and import content data based on it
    const {language} = useContext(LanguageContext);
    const data = languages[language];

    // Build list of nav links
    const pages = Object.keys(data.anonpages);
    const navs = pages.map(key => {
        const page = data.anonpages[key];
        return {
                pageKey: key,
                id: page.id.replace('-page','-link'),
                navButton: page["nav-button"],
                }
    });

    return (
        <nav id="anonymous-navigation" className="navbar navbar-expand-md navbar-light responsive-nav" style={{fontWeight: "500"}}>
            <div className="container-fluid" style={{justifyContent:"left"}}>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent2" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent2">
                    <ul id="app-navigation" className="navbar-nav me-auto mb-2 mb-lg-0" style={{margin: "0px 0px 0px -15px", justifyContent: "space-between", boxSizing:"border-box", width: "calc(100% + 15px)", marginTop:'4px'}}>
                        {navs.map((nav,i)=> <li id={nav.id} key={i} style={{padding:"0px 20px", textShadow: "1px 0px 0px #000", fontColor: "#000", fontWeight: "300", fontSize: "1.2rem", fontFamily: "Rubik, Arial, sans-serif"}} className="nav-item"><div className={"nav-link"} style={{paddingLeft: "0px", paddingRight: "0px"}}>{nav.navButton}</div></li>)}
                    </ul>
                </div>
            </div>
            {navs ? navs.map((nav,i)=> <ReactTooltip id={nav.dataFor} key={i} place="bottom" type="dark" effect="solid" multiline={true} />) : null}
        </nav>
    )
}

export default AnonNav;