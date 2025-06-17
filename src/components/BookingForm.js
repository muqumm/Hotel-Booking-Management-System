import axios from 'axios';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookingForm = ({ room }) => {
    const [formData, setFormData] = useState({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        customer_cnic: '',
        check_in: new Date(),
        check_out: new Date(new Date().setDate(new Date().getDate() + 1))
    });

    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleDateChange = (date, field) => {
        setFormData({
            ...formData,
            [field]: date
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/bookings', {
                room_id: room.id,
                ...formData,
                check_in: formData.check_in.toISOString().split('T')[0],
                check_out: formData.check_out.toISOString().split('T')[0]
            });
            
            setMessage('Booking successful!');
            setIsSuccess(true);
        } catch (error) {
            setMessage('Error creating booking. Please try again.');
            setIsSuccess(false);
            console.error(error);
        }
    };

    return (
        <div className="booking-form-container">
            <h2>Book {room.name}</h2>
            {message && (
                <div className={`message ${isSuccess ? 'success' : 'error'}`}>
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="customer_name"
                        value={formData.customer_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="customer_email"
                        value={formData.customer_email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input
                        type="tel"
                        name="customer_phone"
                        value={formData.customer_phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>CNIC</label>
                    <input
                        type="text"
                        name="customer_cnic"
                        value={formData.customer_cnic}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Check-in Date</label>
                    <DatePicker
                        selected={formData.check_in}
                        onChange={(date) => handleDateChange(date, 'check_in')}
                        minDate={new Date()}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Check-out Date</label>
                    <DatePicker
                        selected={formData.check_out}
                        onChange={(date) => handleDateChange(date, 'check_out')}
                        minDate={formData.check_in}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Confirm Booking</button>
            </form>
        </div>
    );
};

export default BookingForm;