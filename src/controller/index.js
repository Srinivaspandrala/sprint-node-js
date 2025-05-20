const model = require('../models/index');

exports.createBattery = async (req, res) => {
    const {current, voltage, temperature, time} = req.body;
    if (!current || !voltage || !temperature || !time) {
        return res.status(400).json({message: 'All fields are required'});
    }
    try {
        const battery = await model.createBattery(current, voltage, temperature, time);
        return res.status(201).json({message: 'Battery created successfully', battery});
    } catch (error) {
        console.error('Create Battery Error:', error);
        return res.status(500).json({message: 'Internal server error', error});
    }
}

exports.getBattery = async (req, res) => {
    try {
        const battery = await model.getBattery();
        return res.status(200).json({message: 'Battery retrieved successfully', battery});
    } catch (error) {
        console.error('Get Battery Error:', error);
        return res.status(500).json({message: 'Internal server error', error});
    }
}

exports.getBatteryById = async (req, res) => {
    const { id } = req.params;
    try {
        const battery = await model.getBatteryById(id);
        if (!battery) {
            return res.status(404).json({ message: 'Battery not found' });
        }
        return res.status(200).json({ message: 'Battery retrieved successfully', battery });
    } catch (error) {
        console.error('Get Battery By ID Error:', error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
};

exports.getBatteryFieldById = async (req, res) => {
    const { id, field } = req.params;
    try {
        const value = await model.getBatteryFieldById(id, field);
        if (value === undefined) {
            return res.status(404).json({ message: 'Battery or field not found' });
        }
        return res.status(200).json({ message: `Battery ${field} retrieved successfully`, value });
    } catch (error) {
        console.error('Get Battery Field By ID Error:', error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
};

exports.getBatteryFieldByIdWithRange = async (req, res) => {
    const { id, field } = req.params;
    const { start, end } = req.query;
    try {
        const values = await model.getBatteryFieldByIdWithRange(id, field, start, end);
        if (!values || values.length === 0) {
            return res.status(404).json({ message: 'No data found for given range' });
        }
        return res.status(200).json({ message: `Battery ${field} in range retrieved successfully`, values });
    } catch (error) {
        console.error('Get Battery Field By ID With Range Error:', error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
};


