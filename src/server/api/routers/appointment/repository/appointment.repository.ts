import { eq } from "drizzle-orm";

import { db } from "@lutra/server/db";
import { appointments } from "@lutra/server/db/schema";

export type CreateAppointmentParams = Omit<
	typeof appointments.$inferInsert,
	"id"
>;

class AppointmentRepository {
	async createAppointment(appointmentOptions: CreateAppointmentParams) {
		try {
			await db.insert(appointments).values(appointmentOptions);
		} catch (err) {
			console.error(
				`Error creating appointment for patient ID "${appointmentOptions.patientId}":`,
				err,
			);
			throw new Error(
				`Failed to create an appointment for patient with ID "${appointmentOptions.patientId}"`,
			);
		}
	}

	async getAppointmentsByPatientId(patientId: number) {
		try {
			return await db
				.select()
				.from(appointments)
				.where(eq(appointments.patientId, patientId));
		} catch (err) {
			console.error(
				`Error fetching appointments for patient ID "${patientId}": `,
				err,
			);
			throw new Error(
				`Failed to fetch appointments for patient with ID "${patientId}"`,
			);
		}
	}
}

export const appointmentRepository = new AppointmentRepository();
