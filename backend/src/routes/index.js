const express = require('express');
const router = express.Router();
const YourModel = require('../models/index');

// Create
router.post('/create', async (req, res) => {
    const newItem = new YourModel(req.body);
    try {
        await newItem.save();
        res.status(201).send(newItem);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Read
router.get('/read', async (req, res) => {
    try {
        const items = await YourModel.find({});
        res.send(items);
    } catch (error) {
        res.status(500).send();
    }
});

// Update
router.patch('/update/:id', async (req, res) => {
    try {
        const item = await YourModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!item) {
            return res.status(404).send();
        }
        res.send(item);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete
router.delete('/delete/:id', async (req, res) => {
    try {
        const item = await YourModel.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).send();
        }
        res.send(item);
    } catch (error) {
        res.status(500).send();
    }
});

module.exports = router;