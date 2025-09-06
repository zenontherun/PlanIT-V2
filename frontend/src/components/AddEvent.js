import React, { useState } from 'react';
import axios from 'axios';

function AddEvent({ userId, onEventAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleAddEvent = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/events', {
        userId, title, description, date
      });
      alert(res.data.message || 'Event added!');
      onEventAdded(); // notify parent to refresh events
    } catch (err) {
      alert(err.response.data.message || 'Error adding event');
    }
  };

  return (
    <div>
      <h2>Add Event</h2>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <button onClick={handleAddEvent}>Add Event</button>
    </div>
  );
}

export default AddEvent;
