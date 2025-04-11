import { TRPCError } from '@trpc/server';

import { patientRepository } from '../repository/patient.repository';

class PatientService {
  async getPatients() {
    return await patientRepository.getPatients();
  }

  async getPatientById(input: string) {
    const id = Number(input);

    if (Number.isNaN(id)) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: `Invalid ID: ${input}. ID must be an integer.`,
      });
    }

    return await patientRepository.getPatientById(id);
  }
}

export const patientService = new PatientService();
