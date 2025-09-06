const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const jwt = require('jsonwebtoken');

// Auth middleware
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded; // contains user id
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Create event
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, date } = req.body;
    if (!title || !date) return res.status(400).json({ message: 'Title and date are required' });

    const event = new Event({ userId: req.user.id, title, description, date });
    await event.save();

    res.status(201).json({ message: 'Event added successfully!', event });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding event' });
  }
});

// Get events of logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const events = await Event.find({ userId: req.user.id }).populate('userId', 'name email');
    res.status(200).json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching events' });
  }
});

// Update an event
router.put('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!event) return res.status(404).json({ message: 'Event not found' });

    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating event' });
  }
});

// Delete an event
router.delete('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!event) return res.status(404).json({ message: 'Event not found' });

    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting event' });
  }
});

module.exports = router;
