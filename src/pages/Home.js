import heroImg from '../assets/heroimage.jpeg';
import Card from '../components/Card.js';

function Home() {

    const image = heroImg;
    const header = 'Welcome to Bad Bank of America';
    const content = <p>See how Bad Bank of America® banking solutions and Bad Merrill Edge® Investment services can help make your personal financial life easier.</p>;
    
    return (
        <Card image={image} header={header} content={content}></Card>
    )

}

export default Home;
