const express = require('express');
const router = express.Router();
const Cafe = require('../models/Cafe');

// Haversine formula to calculate distance in kilometers
const haversine = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
};

// POST: Add a new cafe (for seeding/admin)
router.post('/', async (req, res) => {
    try {
        const { name, description, rating, popularity, latitude, longitude, images } = req.body;
        const newCafe = new Cafe({
            name,
            description,
            rating,
            popularity,
            location: { latitude, longitude },
            images
        });
        const savedCafe = await newCafe.save();
        res.status(201).json(savedCafe);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET: Get recommended cafes based on user location
router.get('/recommend', async (req, res) => {
    try {
        const { userLat, userLong } = req.query;

        if (!userLat || !userLong) {
            return res.status(400).json({ error: 'User location (userLat, userLong) is required' });
        }

        const cafes = await Cafe.find();
        const uLat = parseFloat(userLat);
        const uLon = parseFloat(userLong);

        // Weights
        const w1 = 0.4; // Rating weight
        const w2 = 0.3; // Popularity weight
        const w3 = 0.3; // Distance weight

        const rankedCafes = cafes.map(cafe => {
            const distance = haversine(uLat, uLon, cafe.location.latitude, cafe.location.longitude);

            // Avoid division by zero if distance is 0 (user is at the cafe)
            // Use a small epsilon or max score cap for the distance component
            const safeDistance = distance < 0.1 ? 0.1 : distance;

            // Normalize popularity if needed? 
            // For now assuming popularity is already somewhat scaled or we just use raw.
            // Let's assume popularity is 0-100.
            // Rating is 0-5.
            // 1/distance can be very large if distance is small.
            // Let's normalize to a roughly common scale if we want the weights to mean what we think.
            // But strict requirement was: Score = w1*rating + w2*popularity + w3*(1/distance)

            const score = (w1 * cafe.rating) + (w2 * cafe.popularity) + (w3 * (1 / safeDistance));

            return {
                ...cafe.toObject(),
                distance: distance.toFixed(2), // Send back distance for UI
                score: score.toFixed(4)
            };
        });

        // Sort by score descending
        rankedCafes.sort((a, b) => b.score - a.score);

        res.json(rankedCafes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
