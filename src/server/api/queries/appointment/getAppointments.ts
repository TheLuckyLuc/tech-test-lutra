import { db } from '@lutra/server/db';
import { appointments } from '@lutra/server/db/schema';

export const getAppointments = async () => {
  try {
    return await db.select().from(appointments);
  } catch (err) {
    console.error('Error fetching appointments:', err);
    throw new Error('Failed to fetch appointments');
  }
};
