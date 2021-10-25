import './styles/App.css';
import './styles/bootstrap.min.css';
import { HashRouter, Route } from 'react-router-dom';
import { useState } from 'react';
import Notification from './components/Notification';
import Home from './pages/Home.js';
import CreateAccount from './pages/CreateAccount.js';
import Deposit from './pages/Deposit';
import Withdraw from './pages/Withdraw';
import Transactions from './pages/Transactions';
import AllData from './pages/AllData';
import AppNav from './components/AppNav';
import logo from './assets/logo.svg';
import LanguageContext from './helpers/LanguageContext';
import FormContext from './helpers/FormContext';
import NotificationContext from './helpers/NotificationContext';
import UserContext from './helpers/UserContext';
import UserDBContext from './helpers/UserDBContext';
import UserLogin from './components/UserLogin';
import Footer from './components/Footer';
import OptionsNav from './components/OptionsNav';

function App() {

  const [loggedInUser, setLoggedInUser] = useState('');
  const [language, setLanguage] = useState('en');
  const [users, setUsers] = useState([]);
  const [notification, setNotification] = useState(null);

  const [form, setForm] = useState('formik');

  function setNewForm(val) {
    setForm(val);
  }

  function addUser(user) {
    let currentUsers = [...users];
    currentUsers.push(user);
    setUsers(currentUsers);
  }

  function logOut() {
    setLoggedInUser('');
  }
  function logIn(val) {
    setLoggedInUser(val);
  }
  
  function changeLanguage(lan) {
    setLanguage(lan);
  }

  const closeNotification = () => {
    let { title, text, type, time } = notification;
    setNotification({ title, text, type, time, display: false })
  }

  function displayNotification({title, text, type, time}) {

    // Clear any existing notification
    setNotification({});

    // Set new notification
    setNotification({display: true, title, text, type, time});

    // Remove notification after timeout
    setTimeout(()=>setNotification({}), time);

  }

  return (
    <>
    <HashRouter>
    <UserDBContext.Provider value={{users, addUser}}>
    <UserContext.Provider value={{ loggedInUser, logOut, logIn }}>
        <LanguageContext.Provider value={{ language, changeLanguage }}>
          <FormContext.Provider value={{ form, setNewForm }}>
            <OptionsNav></OptionsNav>
              <div className="App">
              
                  <div className="brand-div"><img alt="" src={logo} className="brand-image"/></div>
                  <div className="login-widget">{users.length > 0 ? <UserLogin loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}></UserLogin> : null}</div>
                  <AppNav />
                  <NotificationContext.Provider value={{ displayNotification }}>
                    {notification && notification.display ? <Notification title={notification.title} type={notification.type} text={notification.text} handleClick={closeNotification} time={notification.time}></Notification> : null}
                    <div className="container" style={{padding:'20px'}}>
                      <Route path="/" exact component={Home}></Route>
                      <Route path="/create-account/" exact component={CreateAccount}></Route>
                      <Route path="/deposit/" exact component={Deposit}></Route>
                      <Route path="/withdraw/" exact component={Withdraw}></Route>
                      <Route path="/transactions/" exact component={Transactions}></Route>
                      <Route path="/all-data/" exact component={AllData}></Route>
                    </div>
                  </NotificationContext.Provider>
                  <Footer></Footer>
                
              </div>
            </FormContext.Provider>
          </LanguageContext.Provider>
          </UserContext.Provider>
      </UserDBContext.Provider>
    </HashRouter>
    </>
  );
}

export default App;
