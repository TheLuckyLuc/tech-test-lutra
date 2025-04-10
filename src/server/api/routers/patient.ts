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

		return await getPatientById(id);
	}),
} satisfies TRPCRouterRecord;
