import {Link} from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

function AppNav() {
    
    const changeActive = e => {
       let targetEl = e.currentTarget;
       console.log(targetEl);
       let link = targetEl.getElementsByClassName('nav-link')[0];
       let currentlyActive = Array.from(document.getElementsByClassName('active'));
        currentlyActive.forEach(el => el.classList.remove('active'));
        link.classList.add('active');
    }  

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent2" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent2">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li id="home-link" onClick={e=> changeActive(e)} className="nav-item" data-for="home-link-tooltip"  data-iscapture="true" data-tip="Return to Home">
                            <Link to="/" className="nav-link active">Home</Link>
                        </li>
                        <li id="create-account-link" onClick={e=> changeActive(e)} className="nav-item" data-for="create-account-link-tooltip"  data-iscapture="true" data-tip="Create an Account">
                            <Link to="/create-account/" className="nav-link">Create Account</Link>
                        </li>
                        <li id="deposit-link" onClick={e=> changeActive(e)} className="nav-item" data-for="deposit-link-tooltip"  data-iscapture="true" data-tip="Deposit to Your Account">
                            <Link to="/deposit/" className="nav-link">Deposit</Link>
                        </li>
                        <li id="withdraw-link" onClick={e=> changeActive(e)} className="nav-item" data-for="withdraw-link-tooltip"  data-iscapture="true" data-tip="Withdraw from Your Account">
                            <Link to="/withdraw/" className="nav-link">Withdraw</Link>
                        </li>
                        <li id="all-data-link" onClick={e=> changeActive(e)} className="nav-item" data-for="all-data-link-tooltip"  data-iscapture="true" data-tip="View All Transaction Data">
                            <Link to="/all-data/" className="nav-link">All Data</Link>
                        </li>
                    </ul>
                </div>
            </div>
             <ReactTooltip id="home-link-tooltip" place="bottom" type="dark" effect="solid" multiline={true} />
             <ReactTooltip id="create-account-link-tooltip" place="bottom" type="dark" effect="solid" multiline={true} />
             <ReactTooltip id="deposit-link-tooltip" place="bottom" type="dark" effect="solid" multiline={true} />
             <ReactTooltip id="withdraw-link-tooltip" place="bottom" type="dark" effect="solid" multiline={true} />
             <ReactTooltip id="all-data-link-tooltip" place="bottom" type="dark" effect="solid" multiline={true} />
        </nav>
    )
}

export default AppNav;