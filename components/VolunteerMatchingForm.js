import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/VolunteerMatchingForm.module.css';

const VolunteerMatchingForm = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState('');
  const [matchedEvent, setMatchedEvent] = useState('');
  const [errors, setErrors] = useState({});
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/volunteers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVolunteers(response.data);
      } catch (error) {
        console.error('Error fetching volunteers:', error);
      }
    };

    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/events', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchVolunteers();
    fetchEvents();
  }, []);

  const validate = () => {
    const errors = {};
    if (!selectedVolunteer) {
      errors.volunteer = 'Volunteer selection is required';
    }
    if (!matchedEvent) {
      errors.event = 'Event selection is required';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleMatch = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
          '/api/matching',
          {
            eventId: matchedEvent,
            volunteerId: selectedVolunteer,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNotifications([...notifications, 'Volunteer matched successfully']);
      } catch (error) {
        console.error('Error matching volunteer to event:', error);
        setNotifications([...notifications, 'Error matching volunteer to event']);
      }
    }
  };

  return (
    <form onSubmit={handleMatch} className={styles.formContainer}>
      <div>
        <label>Volunteer Name:</label>
        <select
          value={selectedVolunteer}
          onChange={(e) => setSelectedVolunteer(e.target.value)}
          required
        >
          <option value="">Select Volunteer</option>
          {volunteers.map((volunteer) => (
            <option key={volunteer.id} value={volunteer.id}>
              {volunteer.fullName}
            </option>
          ))}
        </select>
        {errors.volunteer && <span className={styles.error}>{errors.volunteer}</span>}
      </div>
      <div>
        <label>Matched Event:</label>
        <select
          value={matchedEvent}
          onChange={(e) => setMatchedEvent(e.target.value)}
          required
        >
          <option value="">Select Event</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.eventName}
            </option>
          ))}
        </select>
        {errors.event && <span className={styles.error}>{errors.event}</span>}
      </div>
      <button type="submit">Match Volunteer</button>
      <div className={styles.notifications}>
        {notifications.map((notification, index) => (
          <div key={index}>{notification}</div>
        ))}
      </div>
    </form>
  );
};

export default VolunteerMatchingForm;
