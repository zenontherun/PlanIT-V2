import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import AddEvent from "./components/AddEvent";
import EventList from "./components/EventList";

function App() {
  return (
    <Router>
      <div>
        <nav style={{ padding: "1rem", background: "#f0f0f0" }}>
          <Link to="/" style={{ marginRight: "1rem" }}>Login</Link>
          <Link to="/signup" style={{ marginRight: "1rem" }}>Signup</Link>
          <Link to="/dashboard" style={{ marginRight: "1rem" }}>Dashboard</Link>
          <Link to="/addevent" style={{ marginRight: "1rem" }}>Add Event</Link>
          <Link to="/events">Event List</Link>
        </nav>

        <div style={{ padding: "1rem" }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addevent" element={<AddEvent />} />
            <Route path="/events" element={<EventList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
