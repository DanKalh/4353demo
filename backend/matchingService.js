// backend/matchingService.js
import prisma from '../lib/prisma';

// Match a volunteer to an event
const matchVolunteerToEvent = async (volunteerId, eventId) => {
  const matchedVolunteer = await prisma.volunteerHistory.create({
    data: {
      volunteerId: volunteerId,
      eventId: eventId,
      participationStatus: 'matched', // Assuming you want to set an initial status
    },
  });
  return matchedVolunteer;
};

// Find volunteers matching the event criteria
const findMatchingVolunteers = async (eventId) => {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!event) {
    throw new Error('Event not found');
  }

  const matchingVolunteers = await prisma.volunteer.findMany({
    where: {
      AND: [
        { skills: { hasSome: event.requiredSkills } },
        { state: event.location }
      ]
    }
  });

  return matchingVolunteers;
};

export { matchVolunteerToEvent, findMatchingVolunteers };
