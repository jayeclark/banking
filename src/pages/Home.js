import heroImg from '../assets/heroimage.jpeg';

function Home() {

    return (
        <div className="card">
            <img src={heroImg} width="100%" className="card-img-top" />
            <div className="card-header"><h4>Welcome to Bad Bank of America.</h4></div>
            <div className="card-body">
                <p>See how Bad Bank of America® banking solutions and Bad Merrill Edge® Investment services can help make your personal financial life easier.</p></div>
        </div>
    )

}

export default Home;
