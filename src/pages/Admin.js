import axios from 'axios';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import '../App.css';
import AdminPanel from '../components/AdminPanel';
import UpdateRooms from '../components/UpdateRooms'; // Add this import

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bookings', {
          withCredentials: true
        });
        setBookings(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch bookings. Please try again later.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <div className="loading">Loading bookings...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="view-bookings">
      <h2>All Bookings</h2>
      {bookings.length > 0 ? (
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Room</th>
              <th>Customer</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.room_name} (${booking.room_price}/night)</td>
                <td>
                  {booking.customer_name}<br />
                  {booking.customer_email}<br />
                  {booking.customer_phone}
                </td>
                <td>{new Date(booking.check_in).toLocaleDateString()}</td>
                <td>{new Date(booking.check_out).toLocaleDateString()}</td>
                <td>${booking.total_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

const Admin = ({ onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/check', {
          withCredentials: true
        });
        if (!response.data.authenticated) {
          navigate('/login');
        }
      } catch (error) {
        navigate('/login');
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <div className="admin-page">
      <Routes>
        <Route path="/" element={<AdminPanel />} />
        <Route path="/view-bookings" element={<ViewBookings />} />
        <Route path="/update-rooms" element={<UpdateRooms />} />
      </Routes>
    </div>
  );
};

export default Admin;

