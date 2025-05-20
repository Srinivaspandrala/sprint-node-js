const controller = require('../controller/index');

const express = require('express');
const router = express.Router();

// Ensure both handlers are functions
router.post('/', controller.createBattery);
router.get('/api/battery', controller.getBattery);
router.get('/api/battery/:id', controller.getBatteryById);
router.get('/api/battery/:id/:field', (req, res, next) => {
    if (req.query.start && req.query.end) {
        controller.getBatteryFieldByIdWithRange(req, res, next);
    } else {
        controller.getBatteryFieldById(req, res, next);
    }
});

module.exports = router;