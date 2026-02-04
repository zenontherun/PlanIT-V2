import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import CafeList from "./components/CafeList";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <Router>
      <div>
        <nav style={{
          padding: "1rem 2rem",
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(10px)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
        }}>
          <Link to="/" style={{ textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'var(--font-h)', color: 'var(--color-primary)' }}>
            PlanIT.
          </Link>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'var(--color-text-dark)', fontWeight: '500' }}>Home</Link>
            <Link to="/recommendations" style={{ textDecoration: 'none', color: 'var(--color-text-dark)', fontWeight: '500' }}>Recommendations</Link>
            <Link to="/login" style={{ textDecoration: 'none', color: 'var(--color-primary)', fontWeight: 'bold' }}>Login</Link>
            <Link to="/signup" className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>Sign Up</Link>
          </div>
        </nav>

        <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/recommendations" element={<CafeList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
