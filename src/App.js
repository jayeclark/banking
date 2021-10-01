import './styles/App.css';
import './styles/bootstrap.min.css';
import { createContext } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import CreateAccount from './pages/CreateAccount.js';
import Deposit from './pages/Deposit.js';
import Withdraw from './pages/Withdraw.js';
import AllData from './pages/AllData.js';
import AppNav from './components/AppNav';
import logo from './assets/logo.svg';

const UserContext = createContext(null);

function App() {


  return (
    <>
    <HashRouter>
      <div className="App">
        <div style={{height:'60px', padding:'15px 40px 20px 40px',textAlign:'left'}}><img src={logo} height="100%"/></div>
        <AppNav />
        <div className="container" style={{padding:'20px'}}>
          <UserContext.Provider value={{users:[]}}>
            <Route path="/" exact component={Home}></Route>
            <Route path="/create-account/" exact component={CreateAccount}></Route>
            <Route path="/deposit/" exact component={Deposit}></Route>
            <Route path="/withdraw/" exact component={Withdraw}></Route>
            <Route path="/all-data/" exact component={AllData}></Route>
          </UserContext.Provider>
        </div>
      </div>
    </HashRouter>
    </>
  );
}

export default App;
