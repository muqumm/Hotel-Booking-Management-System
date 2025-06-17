import axios from 'axios';
import { useState } from 'react';

const RoomForm = ({ onRoomAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        capacity: '',
        amenities: '',
        image: null
    });

    const [status, setStatus] = useState({
        loading: false,
        message: '',
        isError: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 5 * 1024 * 1024) { // 5MB limit
            setStatus({
                loading: false,
                message: 'Image size must be less than 5MB',
                isError: true
            });
            return;
        }
        setFormData(prev => ({
            ...prev,
            image: file
        }));
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            return 'Room name is required';
        }
        if (!formData.description.trim()) {
            return 'Description is required';
        }
        if (formData.price <= 0) {
            return 'Price must be greater than 0';
        }
        if (formData.capacity <= 0) {
            return 'Capacity must be at least 1';
        }
        if (!formData.amenities.trim()) {
            return 'Amenities are required';
        }
        if (!formData.image) {
            return 'Room image is required';
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const validationError = validateForm();
        if (validationError) {
            setStatus({
                loading: false,
                message: validationError,
                isError: true
            });
            return;
        }

        setStatus({ loading: true, message: '', isError: false });

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name.trim());
        formDataToSend.append('description', formData.description.trim());
        formDataToSend.append('price', formData.price);
        formDataToSend.append('capacity', formData.capacity);
        formDataToSend.append('amenities', formData.amenities.trim());
        formDataToSend.append('image', formData.image);

        try {
            const response = await axios.post(
                'http://localhost:5000/api/rooms',
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true,
                    timeout: 10000 // 10 seconds timeout
                }
            );
            
            setStatus({
                loading: false,
                message: 'Room added successfully!',
                isError: false
            });

            // Reset form
            setFormData({
                name: '',
                description: '',
                price: '',
                capacity: '',
                amenities: '',
                image: null
            });

            // Clear file input
            document.querySelector('input[type="file"]').value = '';

            if (onRoomAdded) {
                onRoomAdded(response.data); // Pass the new room data to parent
            }

        } catch (error) {
            let errorMessage = 'Error adding room';
            if (error.response) {
                errorMessage = error.response.data.message || 
                               error.response.data.error || 
                               errorMessage;
            } else if (error.request) {
                errorMessage = 'No response from server. Please try again.';
            }

            setStatus({
                loading: false,
                message: errorMessage,
                isError: true
            });
            console.error('Room submission error:', error);
        }
    };

    return (
        <div className="room-form-container">
            <h2>Add New Room</h2>
            
            {status.message && (
                <div className={`alert ${status.isError ? 'alert-error' : 'alert-success'}`}>
                    {status.message}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Room Name *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Deluxe Suite"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description *</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe the room features..."
                        rows="4"
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="price">Price per Night ($) *</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            min="1"
                            step="1"
                            placeholder="99"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="capacity">Capacity *</label>
                        <input
                            type="number"
                            id="capacity"
                            name="capacity"
                            value={formData.capacity}
                            onChange={handleChange}
                            min="1"
                            placeholder="2"
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="amenities">Amenities *</label>
                    <input
                        type="text"
                        id="amenities"
                        name="amenities"
                        value={formData.amenities}
                        onChange={handleChange}
                        placeholder="WiFi, TV, AC, Mini-bar"
                        required
                    />
                    <small className="hint">Separate amenities with commas</small>
                </div>

                <div className="form-group">
                    <label htmlFor="image">Room Image *</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleFileChange}
                        accept="image/*"
                        required
                    />
                    <small className="hint">Max 5MB (JPEG, PNG, WEBP)</small>
                </div>

                <button 
                    type="submit" 
                    className="submit-button"
                    disabled={status.loading}
                >
                    {status.loading ? 'Adding Room...' : 'Add Room'}
                </button>
            </form>
        </div>
    );
};

export default RoomForm;