import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { publicProcedure } from "../../trpc";
import { patientService } from "./service/patient.service";

export const patientRouter = {
	getPatients: publicProcedure.query(patientService.getPatients),
	getPatientById: publicProcedure.input(z.string()).query(async ({ input }) => {
		return patientService.getPatientById(input);
	}),
} satisfies TRPCRouterRecord;
