import React from 'react';
import UserLogin from './UserLogin';
import '../styles/TopRibbon.css';
import flag from '../assets/flag.svg';

export default function TopRibbon({ loggedInUser, setLoggedInUser }) {
  return (
    <div className="top-ribbon">
        <ul>
          <li className="active-ribbon">Personal</li>
          <li>Small Business</li>
          <li>Wealth Management</li>
          <li>Businesses {"&"} Institutions</li>
          <li>Security</li>
          <li><div style={{display: "flex", flexWrap: "nowrap"}}><img width="26px" alt="logo" src={flag} float="left" /><div>&nbsp;About Us</div></div></li>
        </ul>
        <div className="login-widget">
          <UserLogin loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}></UserLogin>
        </div>        
    </div>
  )
}