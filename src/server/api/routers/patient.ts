import type { TRPCRouterRecord } from "@trpc/server";

import { getPatients } from "../queries/patient";
import { publicProcedure } from "../trpc";

export const patientRouter = {
	getPatients: publicProcedure.query(getPatients),
} satisfies TRPCRouterRecord;
