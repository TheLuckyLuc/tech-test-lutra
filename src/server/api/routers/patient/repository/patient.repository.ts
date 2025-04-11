import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';

import { db } from '@lutra/server/db';
import { patients } from '@lutra/server/db/schema';

class PatientRepository {
  async getPatients() {
    try {
      // We only need a subset of patient fields for the list view
      return await db
        .select({
          id: patients.id,
          firstName: patients.firstName,
          lastName: patients.lastName,
          isActive: patients.isActive,
        })
        .from(patients);
    } catch (err) {
      console.error('Error fetching patients:', err);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch patients',
      });
    }
  }

  async getPatientById(id: number) {
    try {
      return await db.query.patients.findFirst({
        where: eq(patients.id, id),
      });
    } catch (err) {
      console.error(`Error fetching patient by ID "${id}":`, err);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Failed to fetch patient with ID "${id}"`,
      });
    }
  }
}

export const patientRepository = new PatientRepository();
