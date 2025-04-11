import { db } from "@lutra/server/db";
import { patients } from "@lutra/server/db/schema";

export const getPatients = async () => {
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
		console.error("Error fetching patients:", err);
		throw new Error("Failed to fetch patients");
	}
};
