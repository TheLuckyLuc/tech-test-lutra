import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { getPatientById, getPatients } from "../queries/patient";
import { publicProcedure } from "../trpc";

export const patientRouter = {
	getPatients: publicProcedure.query(getPatients),
	getPatientById: publicProcedure.input(z.string()).query(async (opts) => {
		const { input } = opts;
		const id = Number(input);

		if (Number.isNaN(id)) {
			throw new Error(`Invalid ID: ${input}. ID must be an integer.`);
		}

		try {
			const patientData = await getPatientById(id);

			if (!patientData) return null;

			return patientData;
		} catch (error) {
			console.error(`Error fetching patient by ID "${id}":`, error);
			throw new Error(`Failed to fetch patient with ID "${id}"`);
		}
	}),
} satisfies TRPCRouterRecord;
