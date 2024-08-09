import { useState } from 'react';

const EventManagementForm = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    eventDescription: '',
    requiredSkills: [],
    location: '',
    eventDate: '',
    urgency: '',
  });
  const [skill, setSkill] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddSkill = () => {
    if (skill && !formData.requiredSkills.includes(skill)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        requiredSkills: [...prevFormData.requiredSkills, skill],
      }));
      setSkill('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create event');
      }

      const data = await response.json();
      alert('Event created successfully!');
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Event Name:</label>
        <input
          type="text"
          name="eventName"
          value={formData.eventName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Event Description:</label>
        <textarea
          name="eventDescription"
          value={formData.eventDescription}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Required Skills:</label>
        <input
          type="text"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
        <button type="button" onClick={handleAddSkill}>Add Skill</button>
        <ul>
          {formData.requiredSkills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
      <div>
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Event Date:</label>
        <input
          type="date"
          name="eventDate"
          value={formData.eventDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Urgency:</label>
        <input
          type="text"
          name="urgency"
          value={formData.urgency}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Create Event</button>
    </form>
  );
};

const EventManagementPage = () => {
  return (
    <div>
      <h1>Event Management</h1>
      <EventManagementForm />
    </div>
  );
};

export default EventManagementPage;
