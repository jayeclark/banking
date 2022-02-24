import '../styles/TopRibbon.css';
import flag from '../assets/flag.svg';

export function TopRibbon() {
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
        <ul>
          <li>Contact Us</li>
          <li>Help</li>
        </ul>           
    </div>
  )
}