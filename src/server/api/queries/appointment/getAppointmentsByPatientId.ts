import { eq } from "drizzle-orm";

import { db } from "@lutra/server/db";
import { appointments } from "@lutra/server/db/schema";

export const getAppointmentsByPatientId = async (patientId: number) => {
	try {
		return await db
			.select()
			.from(appointments)
			.where(eq(appointments.patientId, patientId));
	} catch (err) {
		console.error(
			`Error fetching appointments for patient ID "${patientId}":`,
			err,
		);
		throw new Error(
			`Failed to fetch appointments for patient with ID "${patientId}"`,
		);
	}
};
