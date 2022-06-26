import React from 'react';
import UserContext from "../helpers/UserContext";
import UserDBContext from "../helpers/UserDBContext";
import LanguageContext from '../helpers/LanguageContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/UserLogin.css';
import languages from '../data/languages';
import axios from 'axios';
import { API_URL } from '../helpers/constants';

function UserLogin() {

    const { users } = useContext(UserDBContext);

    const { loggedInUser, logOut } = useContext(UserContext);

    // Get language context and set language data
    const { language, changeLanguage } = useContext(LanguageContext);
    const data = languages[language];
    const { signOut, signIn, en, es } = data.general;

    const getUser = (users, loggedInUser) => {
        console.log(users, loggedInUser);
        return users[0];
    }

    const handleSignOut = async () => {
        if (loggedInUser !== '') {
            const logoutResult = await axios.post(`${API_URL}/auth/logout`, {}, { headers: { Authorization: `Bearer ${getUser(users, loggedInUser).access_token}` } });
            if (logoutResult.status !== 200) {
                console.error(logoutResult.data);
            }
            logOut();
        }
    }
 
    const handleChange = e => {
        const selectBox = document.getElementById("language-toggler");
        const selectedValue = selectBox.options[selectBox.selectedIndex].value;
        if (language !== selectedValue) {changeLanguage(selectedValue)}
    }

    return (
        <div style={{fontSize:"0.8rem", height: 'auto', border: "none", margin:'auto 0px', display:'flex',flexWrap:'nowrap',alignItems:'center'}}>
            {(loggedInUser !== '') ? <div className="login-name">{getUser(users, loggedInUser).username}</div> : null}
            <div className='login-link' onClick={loggedInUser !== '' ? handleSignOut : null}>{loggedInUser !== '' ? signOut : users.length > 0 ? <Link style={{textDecoration:'none',color:'black', fontSize:'inherit'}} to="/">{signIn}</Link>: null}
            </div>
            <div className="language-toggle-container">
                <select id="language-toggler"  className="language-toggle" defaultValue={language} onChange={handleChange} tabIndex="0">
                    <option value="en">{en}</option>
                    <option value="es">{es}</option>
                </select>
            </div>
            <div style={{paddingLeft: "15px", paddingRight: "28px"}}>Contact Us</div>
            <div style={{paddingRight: "10px"}}>Help</div>
        </div>
    )
}

export default UserLogin;