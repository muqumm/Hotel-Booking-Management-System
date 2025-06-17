const Booking = require('../models/Booking');
const Room = require('../models/Room');

const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.getAll();
        res.json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const createBooking = async (req, res) => {
    const { room_id, customer_name, customer_email, customer_phone, customer_cnic, check_in, check_out } = req.body;

    try {
        const room = await Room.getById(room_id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        // Calculate total price based on days and room price
        const checkInDate = new Date(check_in);
        const checkOutDate = new Date(check_out);
        const days = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);
        const total_price = days * room.price;

        const bookingId = await Booking.create(
            room_id,
            customer_name,
            customer_email,
            customer_phone,
            customer_cnic,
            check_in,
            check_out,
            total_price
        );

        res.status(201).json({ id: bookingId, message: 'Booking created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getAllBookings, createBooking };