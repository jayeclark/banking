import React, { useRef } from "react";

const closeMenuButton =
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="close-icon" viewBox="0 0 16 16">
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
  </svg>;

const closeSignInButton =
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="close-icon" viewBox="0 0 16 16">
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
  </svg>;

export default function MobileNav({ handleShowSignIn }) {

  const signInIcon = useRef(null);
  const menuIcon = useRef(null);
  const menuRef = useRef(null);

  const toggleSignIn = () => {
    if (signInIcon.current.classList.contains("expanded")) {
      signInIcon.current.classList.remove("expanded");
      handleShowSignIn();
    } else {
      handleShowSignIn();
      signInIcon.current.classList.add("expanded");
      if (menuRef.current.classList.contains("expanded")) {
        menuRef.current.classList.remove("expanded");
        menuIcon.current.classList.remove("expanded");
      }
    }
  }

  const toggleMenu = () => {
    if (menuRef.current.classList.contains("expanded")) {
      menuRef.current.classList.remove("expanded");
      menuIcon.current.classList.remove("expanded");
    } else {
      menuRef.current.classList.add("expanded");
      menuIcon.current.classList.add("expanded");
      if (signInIcon.current.classList.contains("expanded")) {
        handleShowSignIn();
        signInIcon.current.classList.remove("expanded");
      }
    }
  }

  return (
    <>
      <div className="mobile-nav-widget">
        <span ref={signInIcon}>
          <span className="open-icon" onClick={toggleSignIn}>Login
          </span>
          <span onClick={toggleSignIn}>
            {closeSignInButton}
          </span>
        </span>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <span ref={menuIcon}>
          <span className="open-icon" onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>
          </span>
          <span onClick={toggleMenu}>
            {closeMenuButton}
          </span>
        </span>
      </div>
      <div className="mobile-menu" ref={menuRef}>
        <div className="search-bar">
          <form>
            <input type="text"></input>
            <button>Search</button>
          </form>
        </div>
        <div className="menu-items">
            <div>Enroll</div>
            <div>Schedule an appointment</div>
            <div>Get the app</div>
            <div>Help</div>
            <div>Find a Location</div>
            <div>Contact</div>
            <div>Privacy &amp; Security</div>
            <div>Small Business</div>
            <div>Wealth Management</div>
            <div>Businesses &amp; Institutions</div>
            <div>Need help with home loan payments?</div>
            <div>About Us</div>
            <div>En español</div>
        </div>
      </div>
    </>
  )
}