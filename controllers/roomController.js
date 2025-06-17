const Room = require('../models/Room');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'backend/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage }).single('image');

const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.getAll();
        res.json(rooms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getRoomById = async (req, res) => {
    try {
        const room = await Room.getById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json(room);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const createRoom = async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: 'Room image is required' });
    }

    const { name, description, price, capacity } = req.body;
    const image = req.files.image;

    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generate unique filename
    const fileName = `${Date.now()}-${image.name.replace(/\s+/g, '-')}`;
    const filePath = path.join(uploadDir, fileName);

    // Move the file to uploads directory
    await image.mv(filePath);

    // Create room in database
    const room = await Room.create({
      name,
      description,
      price,
      capacity,
      imageUrl: `/uploads/${fileName}`
    });

    res.status(201).json(room);
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ message: 'Error creating room', error: error.message });
  }
};

module.exports = { getAllRooms, getRoomById, createRoom };