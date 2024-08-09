import prisma from '../lib/prisma';

export const findMatchingVolunteers = async (eventId) => {
  // Ensure eventId is a valid integer
  const parsedEventId = parseInt(eventId, 10);
  if (isNaN(parsedEventId)) {
    throw new Error(`Invalid event ID: ${eventId}`);
  }

  // Fetch the event details
  const event = await prisma.event.findUnique({
    where: { id: parsedEventId },
  });

  if (!event) {
    throw new Error(`Event with id ${parsedEventId} not found`);
  }

  const { requiredSkills, location, eventDate } = event;

  // Find volunteers that match the event's criteria
  const matchingVolunteers = await prisma.volunteer.findMany({
    where: {
      AND: [
        {
          skills: {
            hasSome: requiredSkills,
          },
        },
        {
          state: location,
        },
        {
          availability: {
            hasSome: [eventDate.toISOString()],
          },
        },
      ],
    },
  });

  return matchingVolunteers;
};
