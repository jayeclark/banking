import { useContext } from 'react';
import Card from '../components/Card.js';
import LanguageContext from '../helpers/LanguageContext';
import languages from '../data/languages';
import locations from '../data/locations.json';
import heroImg from '../assets/heroimage.jpeg';

function Home() {

    // Get language preference and import content data based on it
    const { language } = useContext(LanguageContext);
    
    // Load page content labels
    const pageName = "locations";
    const { labels: { branch, atm, address, hours, directions }, id } = languages[language].components[pageName];
    
    return (
        <Card id={ id } image={ image } header={ header } content={ content }></Card>
    )

}

export default Home;
