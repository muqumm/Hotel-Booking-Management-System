const db = require('../config/db');

class Room {
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM rooms');
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.query('SELECT * FROM rooms WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(name, description, price, capacity, image_path, amenities) {
        const [result] = await db.query(
            'INSERT INTO rooms (name, description, price, capacity, image_path, amenities) VALUES (?, ?, ?, ?, ?, ?)',
            [name, description, price, capacity, image_path, amenities]
        );
        return result.insertId;
    }

    static async update(id, name, description, price, capacity, image_path, amenities) {
        await db.query(
            'UPDATE rooms SET name = ?, description = ?, price = ?, capacity = ?, image_path = ?, amenities = ? WHERE id = ?',
            [name, description, price, capacity, image_path, amenities, id]
        );
    }

    static async delete(id) {
        await db.query('DELETE FROM rooms WHERE id = ?', [id]);
    }
}

module.exports = Room;