const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const PhoneBook = require('./model/PhoneBook.js');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}..`);
});

// Database connection
const DB = 'mongodb+srv://nehashetty:Mongodb@cluster0.wfi6caw.mongodb.net/';
mongoose.connect(DB, {
    useNewUrlParser: true,
}).then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.error('Database connection error:', err);
});

// Add a phone number
app.post('/add-phone', async (req, res) => {
    const { name, phone } = req.body;
    try {
        const phoneNumber = new PhoneBook({ name, phone });
        await phoneNumber.save();
        res.status(201).json({
            status: 'Success',
            data: phoneNumber
        });
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err.message
        });
    }
});

// Get all phone numbers
app.get('/get-phone', async (req, res) => {
    try {
        const phoneNumbers = await PhoneBook.find({});
        res.status(200).json({
            status: 'Success',
            data: phoneNumbers
        });
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err.message
        });
    }
});

// Update a phone number
app.put('/update-phone/:id', async (req, res) => {
    const { name, phone } = req.body;
    try {
        const updatedPhoneNumber = await PhoneBook.findByIdAndUpdate(req.params.id, { name, phone }, { new: true });
        res.status(200).json({
            status: 'Success',
            data: updatedPhoneNumber
        });
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err.message
        });
    }
});

// Delete a phone number
app.delete('/delete-phone/:id', async (req, res) => {
    try {
        await PhoneBook.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 'Success',
            message: 'Phone number deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err.message
        });
    }
});
