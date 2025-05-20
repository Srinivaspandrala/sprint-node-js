const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Set database file path
const dbPath = path.resolve(__dirname, '../battery.db');

// Create and export the database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to SQLite database');
    }
});

module.exports = db;
