import { Link } from 'react-router-dom';

const RoomCard = ({ room }) => {
    return (
        <div className="room-card">
            <img 
                src={`http://localhost:5000/uploads/${room.image_path}`} 
                alt={room.name} 
                className="room-image"
                onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=Room+Image';
                }}
            />
            <div className="room-details">
                <h3>{room.name}</h3>
                <p>{room.description}</p>
                <p><strong>Price:</strong> ${room.price} per night</p>
                <p><strong>Capacity:</strong> {room.capacity} person(s)</p>
                <p><strong>Amenities:</strong> {room.amenities}</p>
                <Link to={`/booking/${room.id}`} className="book-button">Book Now</Link>
            </div>
        </div>
    );
};

export default RoomCard;