import React from 'react';
import { useContext } from 'react';
import Card from '../components/Card.js';
import LanguageContext from '../helpers/LanguageContext';
import languages from '../data/languages';
import heroImg from '../assets/heroimage.jpeg';
import UserContext from '../helpers/UserContext.js';
import UserDBContext from '../helpers/UserDBContext.js';
import { SignIn } from '../components/SignIn.js';

function Home() {

    // Get language preference and import content data based on it
    const { language } = useContext(LanguageContext);

    const { loggedInUser } = useContext(UserContext);
    const { users } = useContext(UserDBContext);
    
    // Load page content
    const pageName = "home";
    let { header, card: { cardMsg }, id } = languages[language].pages[pageName];
    const [content, image] = [<span>{ cardMsg }</span>, heroImg];

    if (loggedInUser) { header += ", " + users.filter(x => x.id === loggedInUser)[0].username + "!"; }
    
    return (
        <div className="home-splash">  
            { loggedInUser ? null :  <SignIn /> } 
            <Card id={ id } image={ image } header={ header } content={ content }></Card>
        </div> 
    )

}

export default Home;
