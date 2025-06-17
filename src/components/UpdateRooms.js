import axios from 'axios';
import { useEffect, useState } from 'react';
import '../App.css';
import RoomForm from './RoomForm';

const UpdateRooms = ({ onRoomAdded }) => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/rooms');
                setRooms(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch rooms. Please try again later.');
                setLoading(false);
                console.error(err);
            }
        };
        fetchRooms();
    }, []);

    const handleRoomAdded = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/rooms');
            setRooms(response.data);
        } catch (err) {
            console.error('Failed to refresh rooms:', err);
        }
    };

    if (loading) return <div className="loading">Loading rooms...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="update-rooms">
            <h2>Update Rooms</h2>
            <div className="add-room-section">
                <h3>Add New Room</h3>
                <RoomForm onRoomAdded={handleRoomAdded} />
            </div>
            <div className="existing-rooms">
                <h3>Existing Rooms</h3>
                {rooms.length > 0 ? (
                    <table className="rooms-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Capacity</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.map(room => (
                                <tr key={room.id}>
                                    <td>{room.id}</td>
                                    <td>{room.name}</td>
                                    <td>${room.price}</td>
                                    <td>{room.capacity}</td>
                                    <td>
                                        <button className="edit-button">Edit</button>
                                        <button className="delete-button">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No rooms found.</p>
                )}
            </div>
        </div>
    );
};

export default UpdateRooms;