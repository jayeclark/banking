import './styles/bootstrap.min.css';
import './styles/App.css';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Notification from './components/Notification';
import Home from './pages/Home.js';
import CreateAccount from './pages/CreateAccount.js';
import Deposit from './pages/Deposit';
import Withdraw from './pages/Withdraw';
import Transactions from './pages/Transactions';
import AllData from './pages/AllData';
import AppNav from './components/AppNav';
import AnonNav from './components/AnonNav';
import TopRibbon from './components/TopRibbon';
import logo from './assets/logo.svg';
import LanguageContext from './helpers/LanguageContext';
import FormContext from './helpers/FormContext';
import NotificationContext from './helpers/NotificationContext';
import UserContext from './helpers/UserContext';
import UserDBContext from './helpers/UserDBContext';
import Footer from './components/Footer';
import { now } from 'lodash';
import OptionsNav from './components/OptionsNav';

function App() {

  const [loggedInUser, setLoggedInUser] = useState('');
  const [currentAccount, setCurrentAccount] = useState(null);
  const [language, setLanguage] = useState('en');
  const [users, setUsers] = useState([]);
  const [notification, setNotification] = useState({ display: false, title: null, text: null, time: 5000, type: null, timestamp: now().toString()});

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
  function setAccount(account) {
    setCurrentAccount(account);
  }
  
  function changeLanguage(lan) {
    setLanguage(lan);
  }

  const closeNotification = () => {
    let { title, text, type, time } = notification;
    setNotification({ title, text, type, time, timestamp: now().toString(), display: false })
  }

  const closeAfterDelay = ({timestamp}) => {
    let elements = document.getElementsByClassName('notification-container');
    if (elements && elements.length > 0 && elements[0].id === timestamp) {
      setNotification({});
    } 
  }

  function displayNotification({title, text, type, time}) {

    // Remove old notification
    setNotification({display: false});

    // Set new notification
    const timestamp = now().toString();
    setNotification({display: true, title, text, type, time, timestamp});

    // Remove notification after timeout
    setTimeout(()=>closeAfterDelay({timestamp}), time);

  }

  return (
    <>
    <BrowserRouter>
    <UserDBContext.Provider value={{users, addUser}}>
    <UserContext.Provider value={{ loggedInUser, logOut, logIn, currentAccount, setAccount }}>
        <LanguageContext.Provider value={{ language, changeLanguage }}>
          <FormContext.Provider value={{ form, setNewForm }}>
            <OptionsNav></OptionsNav>
              <div className="App">
                  <TopRibbon loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
                  <div className="brand-div">
                    <Link to="/" style={{ cursor: "pointer" }}>
                      <img alt="" src={logo} className="brand-image"/>
                    </Link>
                  </div>
                  {loggedInUser ? <AppNav /> : <AnonNav />}
                  <NotificationContext.Provider value={{ displayNotification }}>
                    {notification && notification.display ? <Notification id={notification.timestamp} title={notification.title} type={notification.type} text={notification.text} handleClick={closeNotification} time={notification.time}></Notification> : null}
                    <div className="container" style={{padding:'10px'}}>
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
    </BrowserRouter>
    </>
  );
}

export default App;
