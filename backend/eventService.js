//backend/eventService.js:

import prisma from '../lib/prisma';

// Get all events
export const getEvents = async () => {
  const events = await prisma.eventDetails.findMany();
  return events;
};

// Add a new event
export const addEvent = async (event) => {
  const newEvent = await prisma.eventDetails.create({
    data: {
      eventName: event.event_name,
      eventDescription: event.event_description,
      location: event.location,
      requiredSkills: event.required_skills, // Assuming this is passed as a JSON array or object
      urgency: event.urgency,
      eventDate: new Date(event.event_date), // Ensure the date is properly formatted
    },
  });
  return newEvent;
};