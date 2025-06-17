const db = require('../config/db');

class Booking {
    static async getAll() {
        const [rows] = await db.query(`
            SELECT b.*, r.name as room_name, r.price as room_price 
            FROM bookings b
            JOIN rooms r ON b.room_id = r.id
        `);
        return rows;
    }

    static async create(room_id, customer_name, customer_email, customer_phone, customer_cnic, check_in, check_out, total_price) {
        const [result] = await db.query(
            'INSERT INTO bookings (room_id, customer_name, customer_email, customer_phone, customer_cnic, check_in, check_out, total_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [room_id, customer_name, customer_email, customer_phone, customer_cnic, check_in, check_out, total_price]
        );
        return result.insertId;
    }
}

module.exports = Booking;