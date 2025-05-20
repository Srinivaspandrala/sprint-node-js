const db = require('../db');

db.run(`
    CREATE TABLE IF NOT EXISTS battery(
    battery_id INTEGER PRIMARY KEY AUTOINCREMENT,
    current INTEGER NOT NULL,
    voltage INTEGER NOT NULL,
    temperature INTEGER NOT NULL,
    time timestamp DEFAULT CURRENT_TIMESTAMP
    )
`)

exports.createBattery = (current, voltage, temperature, time) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO battery (current, voltage, temperature, time) VALUES (?, ?, ?, ?)`;
        db.run(sql, [current, voltage, temperature, time], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ battery_id: this.lastID, current, voltage, temperature, time });
            }
        });
    });
}

// Fix export name to match controller usage
exports.getBattery = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM battery`;
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                console.error('Error retrieving data from database', err);
            } else {
                resolve(rows);
                console.log(rows);
            }
        });
    });
}

exports.getBatteryById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM battery WHERE battery_id = ?`;
        db.get(sql, [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

exports.getBatteryFieldById = (id, field) => {
    const allowedFields = ['current', 'voltage', 'temperature', 'time', 'battery_id'];
    if (!allowedFields.includes(field)) {
        return Promise.resolve(undefined);
    }
    return new Promise((resolve, reject) => {
        const sql = `SELECT ${field} FROM battery WHERE battery_id = ?`;
        db.get(sql, [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row ? row[field] : undefined);
            }
        });
    });
};

exports.getBatteryFieldByIdWithRange = (id, field, start, end) => {
    const allowedFields = ['current', 'voltage', 'temperature', 'time', 'battery_id'];
    if (!allowedFields.includes(field)) {
        return Promise.resolve([]);
    }
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT ${field}, time FROM battery
            WHERE battery_id = ? AND time >= ? AND time <= ?
        `;
        db.all(sql, [id, start, end], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};