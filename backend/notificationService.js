//backend/notificationService.js:

import prisma from '../lib/prisma';

// Get all notifications
export const getNotifications = async () => {
  const notifications = await prisma.notification.findMany();
  return notifications;
};

// Add a new notification
export const addNotification = async (notification) => {
  const newNotification = await prisma.notification.create({
    data: {
      volunteerId: notification.volunteer_id,
      message: notification.message,
    },
  });
  return newNotification;
};