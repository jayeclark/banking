import {Link} from 'react-router-dom';

function AppNav() {
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li id="home-link" className="nav-item" data-toggle="tooltip" data-placement="bottom" title="Return to Home">
                            <Link to="/" className="active">Home</Link>
                        </li>
                        <li id="create-account-link" className="nav-item" data-toggle="tooltip" data-placement="bottom" title="Create an Account">
                            <Link to="/create-account/">Create Account</Link>
                        </li>
                        <li id="deposit-link" className="nav-item" data-toggle="tooltip" data-placement="bottom" title="Deposit to Your Account">
                            <Link to="/deposit/">Deposit</Link>
                        </li>
                        <li id="withdraw-link" className="nav-item" data-toggle="tooltip" data-placement="bottom" title="Withdraw from Your Account">
                            <Link to="/withdraw/">Withdraw</Link>
                        </li>
                        <li id="all-data-link" className="nav-item" data-toggle="tooltip" data-placement="bottom" title="View All Transaction Data">
                            <Link to="/all-data/">All Data</Link>
                        </li>
                    </ul>
                </div>
            </div>
            </nav>
    )
}

export default AppNav;