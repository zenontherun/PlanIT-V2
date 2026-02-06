☕ PlanIT – Cafe Recommendation System

PlanIT is a smart cafe recommendation platform designed to help users discover the best cafes based on their preferences, location, and overall experience factors. The system analyzes multiple parameters such as ratings, popularity, distance, price range, and ambience to provide personalized cafe suggestions.

PlanIT transforms the traditional event planning concept into a user-focused cafe discovery solution that simplifies the decision-making process when choosing a place to relax, work, or meet friends.

🚀 Features

Personalized Cafe Recommendations – Suggests cafes based on user preferences and filters.

Distance-Based Ranking – Recommends cafes based on proximity to the user’s location.

Multi-Factor Scoring System – Ranks cafes using weighted parameters like rating, popularity, and location.

User Portal – Allows users to browse cafes, apply filters, and view recommendations.

Admin Portal – Enables administrators to manage cafe listings, update details, and maintain system data.

Responsive Interface – Designed to work smoothly across multiple devices.

📍 Distance Calculation Using Haversine Algorithm

PlanIT uses the Haversine Algorithm to calculate the geographical distance between the user’s location and cafe locations. This algorithm determines the shortest distance between two points on the Earth’s surface using latitude and longitude coordinates. By using this method, the system ensures accurate and reliable location-based recommendations.

🧠 Recommendation Logic

PlanIT uses a scoring formula to rank cafes:

Score = w1 × Rating + w2 × Popularity + w3 × (1 / Distance)


Where:

w1, w2, w3 represent weights assigned to each factor.

Rating ensures quality-based recommendations.

Popularity reflects user engagement and visits.

Distance ensures nearby cafes are prioritized.

🎯 Problem Solved

PlanIT improves cafe discovery by addressing:

Difficulty in finding suitable cafes

Matching cafes with budget and ambience preferences

Providing accurate location-based recommendations

🛠️ Technology Stack

Frontend: React.js

Backend: Node.js, Express.js

Database: MongoDB

Other Tools: REST APIs, Haversine Distance Calculation
