import './styles/App.css';

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
    <div className="App" style={{padding:'140px 20px 20px 20px'}}>

      <div>
        <h2>Bad bank app components will go here! </h2>
        <p>(Navigation bar for portfolio is being dynamically imported from my portfolio site.</p>

      </div>

    </div>
  );
}

async function loadPortfolio() {

  const result = await fetch('https://jayeclark.github.io/');
  const homePage = await result.text();
  
  return homePage;

}

export default App;
