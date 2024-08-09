//backend/historyService.js:

import prisma from '../lib/prisma';

// Add a new volunteer history entry
const addVolunteerHistory = async (volunteerId, eventId, status) => {
  const newVolunteerHistory = await prisma.volunteerHistory.create({
    data: {
      volunteerId: volunteerId,
      eventId: eventId,
      participationStatus: status,
    },
  });
  return newVolunteerHistory;
};

export { addVolunteerHistory };