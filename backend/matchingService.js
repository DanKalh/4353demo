//backend/matchingService.js:

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

export { matchVolunteerToEvent }; 