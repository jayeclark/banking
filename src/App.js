import './styles/App.css';
import './styles/bootstrap.min.css';
import { HashRouter, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home.js';
import CreateAccount from './pages/CreateAccount.js';
import Deposit from './pages/Deposit';
import Withdraw from './pages/Withdraw';
import AllData from './pages/AllData';
import AppNav from './components/AppNav';
import logo from './assets/logo.svg';
import LanguageContext from './helpers/LanguageContext';
import FormContext from './helpers/LanguageContext';
import UserContext from './helpers/UserContext';
import UserDBContext from './helpers/LanguageContext';
import UserLogin from './components/UserLogin';

function App() {

  const [loggedInUser, setLoggedInUser] = useState('');

  function logOut() {
    setLoggedInUser('');
  }
  function logIn(val) {
    setLoggedInUser(val);
  }
  
  return (
    <>
    <HashRouter>
    <UserDBContext.Provider value={{users: []}}>
    <UserContext.Provider value={{ loggedInUser, logOut, logIn }}>
        <LanguageContext.Provider value={{language:'en'}}>
          <div className="App">
            <div style={{height:'60px', padding:'15px 40px 20px 40px',textAlign:'left'}}><img alt="" src={logo} height="100%"/></div>
            <div style={{position:'absolute',display:'flex',height:'60px',right:'0px',top:'0px'}}><UserLogin loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}></UserLogin></div>
            <AppNav />
            <div className="container" style={{padding:'20px'}}>
           
                <FormContext.Provider value={{form:'formik'}}>
                  
                      <Route path="/" exact component={Home}></Route>
                      <Route path="/create-account/" exact component={CreateAccount}></Route>
                      <Route path="/deposit/" exact component={Deposit}></Route>
                      <Route path="/withdraw/" exact component={Withdraw}></Route>
                      <Route path="/all-data/" exact component={AllData}></Route>
                    
                </FormContext.Provider>
             
            </div>
          </div>
          </LanguageContext.Provider>
          </UserContext.Provider>
      </UserDBContext.Provider>
    </HashRouter>
    </>
  );
}

export default App;
