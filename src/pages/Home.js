import { useContext } from 'react';
import Card from '../components/Card.js';
import LanguageContext from '../helpers/LanguageContext';
import languages from '../data/languages';
import heroImg from '../assets/heroimage.jpeg';

function Home() {

    // Get language preference and import content data based on it
    const { language } = useContext(LanguageContext);
    
    // Load page content
    const pageName = "home";
    const { header, card: { cardMsg }, id } = languages[language].pages[pageName];
    const [content, image] = [<span>{ cardMsg }</span>, heroImg];
    
    return (
        <Card id={ id } image={ image } header={ header } content={ content }></Card>
    )

}

export default Home;
