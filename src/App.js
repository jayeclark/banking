import './styles/App.css';
import { createContext } from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';
import Home from './pages/Home.js';
import CreateAccount from './pages/CreateAccount.js';
import Deposit from './pages/Deposit.js';
import Withdraw from './pages/Withdraw.js';
import AllData from './pages/AllData.js';
import AppNav from './components/AppNav';

const UserContext = createContext(null);

function App() {

  loadPortfolio().then(result=>{
    const [start, end] = [result.indexOf('<nav '), result.indexOf('</nav>')];
    let navBar = result.substring(start, end);
    navBar = navBar.replace("\"active\"" ,'');
    console.log(navBar);

    const currentNav = document.getElementById('portfolio-nav');
    currentNav.innerHTML = navBar;
  });

  return (
    <HashRouter>
      <div className="App" style={{padding:'140px 20px 20px 20px'}}>
      <AppNav />
      <div>
        <h2>Bad bank app components will go here! </h2>
        <p>(Navigation bar for portfolio is being dynamically imported from my portfolio site.</p>
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

  );
}

async function loadPortfolio() {

  const result = await fetch('https://jayeclark.github.io/');
  const homePage = await result.text();
  
  return homePage;

}

export default App;
