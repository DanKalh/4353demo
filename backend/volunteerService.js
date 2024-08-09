import prisma from '../lib/prisma';

export const createVolunteer = async (volunteerData) => {
  return await prisma.volunteer.create({
    data: volunteerData,
  });
};

export const updateVolunteer = async (id, volunteerData) => {
  return await prisma.volunteer.update({
    where: { id },
    data: volunteerData,
  });
};

export const getVolunteerById = async (id) => {
  return await prisma.volunteer.findUnique({
    where: { id },
  });
};

export const getAllVolunteers = async () => {
  return await prisma.volunteer.findMany();
};
