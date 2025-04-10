import { db } from '@lutra/server/db';
import { patients } from '@lutra/server/db/schema';

export const getPatients = async () => {
  try {
    return await db.select().from(patients);
  } catch (err) {
    console.error('Error fetching patients:', err);
    throw new Error('Failed to fetch patients');
  }
};
