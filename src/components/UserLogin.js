import UserContext from "../helpers/UserContext";
import UserDBContext from "../helpers/UserDBContext";
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/userLogin.css';

function UserLogin() {

    const userDBContext = useContext(UserDBContext);

    const {loggedInUser, logIn, logOut} = useContext(UserContext);


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
    
    return (
        <div style={{padding:'10px',fontSize:"0.8rem", height: 'auto', margin:'auto 0px', display:'flex',flexWrap:'nowrap'}}>
        {(loggedInUser !== '') ? <div style={{padding: '0px 10px',borderRight: '1px solid #ccc'}}>{getUser(userDBContext,loggedInUser).name}</div> : null}<div className='login-link' onClick={loggedInUser !== '' ? handleSignOut : userDBContext.users.length > 0 ? handleSignIn : null}>{loggedInUser !== ''  ? 'Sign Out' : userDBContext.users.length > 0 ? 'Sign In' : <Link style={{textDecoration:'none',color:'black'}} to="/create-account/">Sign In</Link>}</div>
        </div>
    )
}

export default UserLogin;