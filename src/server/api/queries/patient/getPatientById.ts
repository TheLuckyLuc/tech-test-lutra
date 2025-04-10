import { db } from "@lutra/server/db";
import { patients } from "@lutra/server/db/schema";
import { eq } from "drizzle-orm";

export const getPatientById = async (id: number) => {
	try {
		return await db.query.patients.findFirst({
			where: eq(patients.id, id),
		});
	} catch (err) {
		console.error(`Error fetching patient by ID "${id}":`, err);
		throw new Error(`Failed to fetch patient with ID "${id}"`);
	}
};
