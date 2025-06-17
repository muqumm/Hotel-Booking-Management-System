import '../App.css';

const Contact = () => {
    return (
        <div className="contact-page">
            <h1>Contact Us</h1>
            
            <div className="contact-info">
                <h2>Get in Touch</h2>
                <div className="contact-details">
                    <div className="contact-method">
                        <h3>Address</h3>
                        <p>123 MHT Street, Luxury District</p>
                        <p>Hospitality City, 12345</p>
                    </div>
                    <div className="contact-method">
                        <h3>Phone</h3>
                        <p>+1 (123) 456-7890</p>
                        <p>+1 (987) 654-3210</p>
                    </div>
                    <div className="contact-method">
                        <h3>Email</h3>
                        <p>info@hotelparadise.com</p>
                        <p>reservations@hotelparadise.com</p>
                    </div>
                </div>
            </div>
            
            <div className="contact-form-container">
                <h2>Send Us a Message</h2>
                <form className="contact-form">
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" name="name" required />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label>Subject</label>
                        <input type="text" name="subject" required />
                    </div>
                    <div className="form-group">
                        <label>Message</label>
                        <textarea name="message" required></textarea>
                    </div>
                    <button type="submit" className="submit-button">Send Message</button>
                </form>
            </div>
            
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>Hotel HMT</h3>
                        <p>Your home away from home</p>
                    </div>
                    <div className="footer-section">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/about">About</a></li>
                            <li><a href="/contact">Contact</a></li>
                            <li><a href="/booking">Booking</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Contact Info</h3>
                        <p>123 Paradise Street</p>
                        <p>info@hotelparadise.com</p>
                        <p>+1 (123) 456-7890</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Hotel MHT. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Contact;