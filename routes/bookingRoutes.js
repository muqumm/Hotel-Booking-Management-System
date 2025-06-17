const express = require('express');
const router = express.Router();
const { getAllBookings, createBooking } = require('../controllers/bookingController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, getAllBookings);
router.post('/', createBooking);

module.exports = router;