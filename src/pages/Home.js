import heroImg from '../assets/heroimage.jpeg';
import Card from '../components/Card.js';
import { useContext } from 'react';
import LanguageContext from '../helpers/LanguageContext';
import languages from '../data/languages';

function Home() {

    const image = heroImg;

    // Get language preference and import content data based on it
    const {language} = useContext(LanguageContext);
    const data = languages[language];
    
    // Load page content
    const {header, card: {cardMsg}, id} = data.pages.home;
    const content = <p>{cardMsg}</p>;
    
    return (
        <Card id={id} image={image} header={header} content={content}></Card>
    )

}

export default Home;
