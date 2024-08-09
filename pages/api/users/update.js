// pages/api/users/update.js
import prisma from '../../../lib/prisma';
import authMiddleware from '../../../middleware/authMiddleware';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  await authMiddleware(req, res, async () => {
    const { fullName, address1, address2, city, state, zipCode, skills, preferences, availability } = req.body;

    try {
      const updatedProfile = await prisma.userProfile.update({
        where: { userId: req.user.id },
        data: {
          fullName,
          address1,
          address2,
          city,
          state,
          zipCode,
          skills,
          preferences,
          availability,
        },
      });

      return res.status(200).json(updatedProfile);
    } catch (error) {
      console.error('Error updating user profile:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
};

export default handler;
