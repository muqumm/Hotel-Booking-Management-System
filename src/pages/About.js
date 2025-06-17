import '../App.css';

const About = () => {
    return (
        <div className="about-page">
            <h1>About Hotel MHT</h1>
            
            <div className="about-section">
                <h2>Our Story</h2>
                <p>
                    Founded in 2010, Hotel Paradise has been providing exceptional hospitality services 
                    to guests from around the world. Our mission is to create memorable experiences 
                    through our personalized service and attention to detail.
                </p>
            </div>
            
            <div className="facilities-section">
                <h2>Our Facilities</h2>
                <ul className="facilities-list">
                    <li>Luxurious rooms and suites with modern amenities</li>
                    <li>24-hour room service</li>
                    <li>Swimming pool and spa</li>
                    <li>Fitness center</li>
                    <li>Restaurant serving local and international cuisine</li>
                    <li>Conference and banquet facilities</li>
                    <li>Free high-speed WiFi</li>
                    <li>Laundry and dry cleaning services</li>
                </ul>
            </div>
            
            <div className="team-section">
                <h2>Our Team</h2>
                <p>
                    Our dedicated team of hospitality professionals is committed to making your stay 
                    comfortable and memorable. From our front desk staff to our housekeeping team, 
                    everyone at Hotel Paradise is trained to provide exceptional service.
                </p>
            </div>
        </div>
    );
};

export default About;