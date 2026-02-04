import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div>
            {/* Hero Section */}
            <section style={{
                height: '90vh',
                background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: '#fff',
                marginTop: '-60px' // Offset nav height
            }}>
                <div className="container">
                    <h1 style={{
                        fontSize: '4rem',
                        marginBottom: '20px',
                        color: '#fff',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                    }}>
                        Discover Your Perfect Brew
                    </h1>
                    <p style={{
                        fontSize: '1.5rem',
                        marginBottom: '40px',
                        maxWidth: '600px',
                        margin: '0 auto 40px'
                    }}>
                        Find the best cafes near you based on popularity, rating, and distance.
                    </p>
                    <Link to="/recommendations" className="btn-primary" style={{ fontSize: '1.2rem', padding: '15px 40px' }}>
                        Find Cafes Near Me
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section style={{ padding: '80px 0', background: 'var(--color-cream)' }}>
                <div className="container">
                    <h2 style={{ textAlign: 'center', marginBottom: '60px', fontSize: '2.5rem' }}>Why Choose PlanIT?</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>

                        {/* Feature 1 */}
                        <div className="card" style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📍</div>
                            <h3>Smart Ranking</h3>
                            <p>Our unique algorithm weights rating, popularity, and proximity to find your best match.</p>
                        </div>

                        {/* Feature 2 */}
                        <div className="card" style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>⚡</div>
                            <h3>Real-Time Check</h3>
                            <p>Instantly calculate distances from your current location to the cafe door.</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="card" style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>☕</div>
                            <h3>Curated Spots</h3>
                            <p>We filter for quality, so you only see the best coffee shops in town.</p>
                        </div>

                    </div>
                </div>
            </section>

            {/* Footer / Admin Link */}
            <footer style={{ padding: '20px', textAlign: 'center', background: '#3E2723', color: '#fff' }}>
                <p>&copy; 2024 PlanIT. All rights reserved.</p>
                <Link to="/login" style={{ color: '#aaa', fontSize: '0.8rem', textDecoration: 'none' }}>Admin Login</Link>
            </footer>
        </div>
    );
};

export default LandingPage;
