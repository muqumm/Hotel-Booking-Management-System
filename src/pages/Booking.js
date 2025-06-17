import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import BookingForm from '../components/BookingForm';
import RoomCard from '../components/RoomCard';

const Booking = () => {
    const { id } = useParams();
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/rooms');
                setRooms(response.data);
                
                if (id) {
                    const room = response.data.find(r => r.id === parseInt(id));
                    if (room) {
                        setSelectedRoom(room);
                    }
                }
                
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch rooms. Please try again later.');
                setLoading(false);
                console.error(err);
            }
        };

        fetchRooms();
    }, [id]);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="booking-page">
            <h1>{selectedRoom ? `Book ${selectedRoom.name}` : 'Our Rooms'}</h1>
            
            {selectedRoom ? (
                <div className="booking-container">
                    <BookingForm room={selectedRoom} />
                </div>
            ) : (
                <div className="rooms-container">
                    {rooms.length > 0 ? (
                        rooms.map(room => (
                            <RoomCard key={room.id} room={room} />
                        ))
                    ) : (
                        <p>No rooms available at the moment.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Booking;