const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Cafe = require('./models/Cafe');

dotenv.config();

const seedCafes = [
    {
        name: "The Daily Grind",
        description: "Best espresso in town.",
        rating: 4.8,
        popularity: 90,
        location: { latitude: 40.7128, longitude: -74.0060 }, // NYC
        images: ["https://placehold.co/600x400?text=Daily+Grind"]
    },
    {
        name: "Cozy Corner",
        description: "Quiet place to read.",
        rating: 4.5,
        popularity: 60,
        location: { latitude: 40.7138, longitude: -74.0070 }, // Close to NYC center
        images: ["https://placehold.co/600x400?text=Cozy+Corner"]
    },
    {
        name: "Urban Brew",
        description: "Hipster vibe.",
        rating: 4.2,
        popularity: 85,
        location: { latitude: 40.7300, longitude: -73.9950 }, // A bit further
        images: ["https://placehold.co/600x400?text=Urban+Brew"]
    },
    {
        name: "Far Away Bean",
        description: "Great coffee but far.",
        rating: 5.0,
        popularity: 20,
        location: { latitude: 40.8000, longitude: -74.1000 }, // Far
        images: ["https://placehold.co/600x400?text=Far+Away"]
    },
    {
        name: "Average Joe's",
        description: "It's okay.",
        rating: 3.0,
        popularity: 50,
        location: { latitude: 40.7128, longitude: -74.0060 }, // Same as Daily Grind
        images: ["https://placehold.co/600x400?text=Average+Joes"]
    }
];

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("Connected to MongoDB for seeding...");
        await Cafe.deleteMany({});
        console.log("Cleared existing cafes.");
        await Cafe.insertMany(seedCafes);
        console.log("Seeded cafes.");
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
