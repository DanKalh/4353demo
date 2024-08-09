// backend/eventService.js
import prisma from '../lib/prisma';

export const createEvent = async (eventData) => {
  return await prisma.event.create({
    data: eventData,
  });
};

export const updateEvent = async (id, eventData) => {
  return await prisma.event.update({
    where: { id },
    data: eventData,
  });
};

export const getEventById = async (id) => {
  return await prisma.event.findUnique({
    where: { id },
  });
};

export const getAllEvents = async () => {
  return await prisma.event.findMany();
};
