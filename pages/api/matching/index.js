// pages/api/matching/index.js
import { findMatchingVolunteers } from '../../../backend/matchingService';

export default async function handler(req, res) {
  console.log(`${req.method} request to /api/matching`);

  if (req.method === 'POST') {
    try {
      const { eventId } = req.body;

      const volunteers = await findMatchingVolunteers(eventId);
      console.log('Matching volunteers found:', volunteers);
      return res.status(200).json(volunteers);
    } catch (error) {
      console.error('Error matching volunteers:', error);
      return res.status(500).json({ error: 'Error matching volunteers' });
    }
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}
