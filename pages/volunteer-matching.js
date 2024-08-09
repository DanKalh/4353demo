// pages/volunteer-matching.js
import { useEffect, useState } from 'react';

const VolunteerMatchingPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [matchingVolunteers, setMatchingVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await response.json();
        setEvents(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleMatchVolunteers = async () => {
    try {
      const response = await fetch('/api/matching', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventId: parseInt(selectedEvent) }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch matching volunteers');
      }

      const data = await response.json();
      setMatchingVolunteers(data);
    } catch (error) {
      console.error('Error matching volunteers:', error);
      setError(error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Volunteer Matching</h1>
      <select onChange={(e) => setSelectedEvent(e.target.value)} value={selectedEvent}>
        <option value="">Select an event</option>
        {events.map((event) => (
          <option key={event.id} value={event.id}>
            {event.eventName}
          </option>
        ))}
      </select>
      <button onClick={handleMatchVolunteers}>Find Volunteers</button>
      {matchingVolunteers.length > 0 ? (
        <ul>
          {matchingVolunteers.map((volunteer) => (
            <li key={volunteer.id}>
              <h2>{volunteer.fullName}</h2>
              <p>Skills: {volunteer.skills.join(', ')}</p>
              <p>Location: {volunteer.city}, {volunteer.state}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No matching volunteers found</p>
      )}
    </div>
  );
};

export default VolunteerMatchingPage;
