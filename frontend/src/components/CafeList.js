import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CafeList = () => {
    const [cafes, setCafes] = useState([]);
    const [userLocation, setUserLocation] = useState({ lat: null, lon: null });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const getLocation = () => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }

        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ lat: latitude, lon: longitude });
                fetchRecommendations(latitude, longitude);
            },
            (err) => {
                setError('Unable to retrieve your location');
                setLoading(false);
                // Fallback or ask generic
                console.error(err);
            }
        );
    };

    const fetchRecommendations = async (lat, lon) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/cafes/recommend?userLat=${lat}&userLong=${lon}`);
            setCafes(response.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch recommendations');
            setLoading(false);
        }
    };

    // Optional: seed specific location for testing if geolocation fails or for demo
    const useDemoLocation = () => {
        setLoading(true);
        // Using NYC coordinates as per seed data
        const demoLat = 40.7128;
        const demoLon = -74.0060;
        setUserLocation({ lat: demoLat, lon: demoLon });
        fetchRecommendations(demoLat, demoLon);
    };

    return (
        <div className="container" style={{ padding: '40px 20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2.5rem' }}>Recommended Cafes</h2>

            <div style={{ marginBottom: '40px', textAlign: 'center', background: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <p style={{ marginBottom: '20px', fontSize: '1.1rem' }}>We need your location to recommend the best cafes nearby.</p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button onClick={getLocation} className="btn-primary">
                        Get My Location
                    </button>
                    <button onClick={useDemoLocation} className="btn-primary" style={{ background: 'var(--color-secondary)', color: '#333' }}>
                        Use Demo Location (NYC)
                    </button>
                </div>
            </div>

            {loading && <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>Brewing recommendations...</p>}
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

            <div style={{ display: 'grid', gap: '20px' }}>
                {cafes.map((cafe) => (
                    <div key={cafe._id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                            <h3 style={{ margin: 0, fontSize: '1.8rem' }}>{cafe.name}</h3>
                            <span style={{
                                background: 'var(--color-gold)',
                                color: '#fff',
                                padding: '5px 15px',
                                borderRadius: '20px',
                                fontWeight: 'bold',
                                fontSize: '0.9rem'
                            }}>
                                Score: {cafe.score}
                            </span>
                        </div>
                        <p style={{ fontSize: '1.1rem', color: '#555' }}>{cafe.description}</p>
                        <div style={{ display: 'flex', gap: '20px', fontSize: '0.9rem', color: 'var(--color-primary)', marginTop: '10px' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>⭐ <strong>{cafe.rating}</strong></span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>👥 <strong>{cafe.popularity}</strong></span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>📍 <strong>{cafe.distance} km</strong></span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CafeList;
