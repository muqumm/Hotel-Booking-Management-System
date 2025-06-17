const express = require('express');
const router = express.Router();
const { getAllRooms, getRoomById, createRoom } = require('../controllers/roomController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', getAllRooms);
router.get('/:id', getRoomById);
router.post('/', authMiddleware, createRoom);

module.exports = router;