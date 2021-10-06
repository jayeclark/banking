import UserContext from "../helpers/UserContext";
import UserDBContext from "../helpers/UserDBContext";
import LanguageContext from '../helpers/LanguageContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/UserLogin.css';
import languages from '../data/languages';

function UserLogin() {

    const userDBContext = useContext(UserDBContext);

    const {loggedInUser, logIn, logOut} = useContext(UserContext);

    // Get language context and set language data
    const {language, changeLanguage} = useContext(LanguageContext);
    const data = languages[language];
    const {signOut, signIn} = data.general;

    const getUser = (userDBContext, loggedInUser) => {
        return userDBContext.users.filter(x=>x.number === loggedInUser)[0];
    }

    const handleSignOut = () => {
        if (loggedInUser !== '') {
            logOut();
        }
    }

    const handleSignIn = () => {
        if (loggedInUser === '' && userDBContext.users.length > 0) {
            let userNum = userDBContext.users[userDBContext.users.length - 1].number;
            logIn(userNum);
        }
        else {
            console.log('error!! no user exists to log in');
        }
    }
    
    const changeActive = () => {
        let targetEl = document.getElementById('create-account-link');
        let link = targetEl.getElementsByClassName('nav-link')[0];
        let currentlyActive = Array.from(document.getElementsByClassName('active'));
         currentlyActive.forEach(el => el.classList.remove('active'));
         link.classList.add('active');
     }  

    const handleChange = e => {
        const selectBox = document.getElementById("language-toggler");
        const selectedValue = selectBox.options[selectBox.selectedIndex].value;
        if (language !== selectedValue) {changeLanguage(selectedValue)}
    }

    return (
        <div style={{padding:'10px',fontSize:"0.8rem", height: 'auto', margin:'auto 0px', display:'flex',flexWrap:'nowrap',alignItems:'center'}}>
            {(loggedInUser !== '') ? <div className="login-name">{getUser(userDBContext,loggedInUser).name}</div> : null}
            <div className='login-link' onClick={loggedInUser !== '' ? handleSignOut : userDBContext.users.length > 0 ? handleSignIn : changeActive}>{loggedInUser !== '' ? signOut : userDBContext.users.length > 0 ? signIn : <Link style={{textDecoration:'none',color:'black', fontSize:'inherit'}} to="/create-account/">{signIn}</Link>}
            </div>
            <div className="language-toggle-container">
                <select id="language-toggler"  className="language-toggle" defaultValue={language} onChange={handleChange} tabIndex="0">
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                </select>
            </div>
        </div>
    )
}

export default UserLogin;