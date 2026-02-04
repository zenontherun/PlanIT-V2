const mongoose = require('mongoose');

const cafeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    rating: { type: Number, required: true, min: 0, max: 5 },
    popularity: { type: Number, required: true, default: 0 }, // e.g., number of visits or a normalized score 0-100
    location: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    },
    images: [{ type: String }], // Array of image URLs
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cafe', cafeSchema);
