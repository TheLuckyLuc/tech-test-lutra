import { z } from "zod";

import type { TRPCRouterRecord } from "@trpc/server";
import {
	createAppointment,
	getAppointmentsByPatientId,
} from "../queries/appointment";
import { publicProcedure } from "../trpc";

export const appointmentRouter = {
	getAppointmentsByPatientId: publicProcedure
		.input(z.string())
		.query(async (opts) => {
			const { input } = opts;
			const id = Number(input);

			if (Number.isNaN(id)) {
				throw new Error(`Invalid ID: ${input}. ID must be an integer.`);
			}

			return await getAppointmentsByPatientId(id);
		}),
	createAppointment: publicProcedure
		.input(
			z.object({
				patientId: z.number().int(),
				scheduledFor: z.date(),
				status: z.enum(["SCHEDULED", "CONFIRMED", "COMPLETED", "CANCELLED"]),
				reason: z.string().max(256),
				notes: z.string().optional(),
				createdAt: z.date().optional(),
				updatedAt: z.date().optional(),
			}),
		)
		.mutation(async (opts) => {
			const { input } = opts;

			try {
				await createAppointment(input);
			} catch (error) {
				console.error("Error creating appointment: ", error);
				throw new Error(
					`Failed to create appointment for patient ID "${input.patientId}"`,
				);
			}
		}),
} satisfies TRPCRouterRecord;
