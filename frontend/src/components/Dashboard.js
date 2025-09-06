import React, { useState } from 'react';
import AddEvent from './AddEvent';    
import EventList from './EventList';  
function Dashboard({ userId }) {
  // State to trigger refresh of EventList
  const [refresh, setRefresh] = useState(false);

  // Function to toggle refresh state
  const refreshEvents = () => setRefresh(prev => !prev);

  return (
    <div>
      <h1>Welcome to PLANIT</h1>
      {/* AddEvent gets userId and a callback to refresh the list */}
      <AddEvent userId={userId} onEventAdded={refreshEvents} />

      {/* EventList key changes when refresh toggles, forcing it to reload */}
      <EventList key={refresh} userId={userId} />
    </div>
  );
}

export default Dashboard;
