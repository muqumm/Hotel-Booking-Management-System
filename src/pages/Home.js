import '../App.css';

const Home = () => {
    return (
        <div className="home-page">
            <div className="hero-section">
                <h1>Welcome to Hotel MHT</h1>
                <p>Experience luxury and comfort like never before</p>
            </div>
            
            <div className="features-section">
                <h2>Why Choose Us?</h2>
                <div className="features-container">
                    <div className="feature">
                        <h3>Luxurious Rooms</h3>
                        <p>Spacious and elegantly designed rooms with modern amenities</p>
                    </div>
                    <div className="feature">
                        <h3>Excellent Service</h3>
                        <p>24/7 customer service to cater to all your needs</p>
                    </div>
                    <div className="feature">
                        <h3>Prime Location</h3>
                        <p>Centrally located with easy access to major attractions</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;