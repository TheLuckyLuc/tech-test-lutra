import { db } from "@lutra/server/db";
import { appointments } from "@lutra/server/db/schema";

type CreateAppointmentParams = Omit<typeof appointments.$inferInsert, "id">;

export const createAppointment = async (
	appointmentOptions: CreateAppointmentParams,
) => {
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
};
