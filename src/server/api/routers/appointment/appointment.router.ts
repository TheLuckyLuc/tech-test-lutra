import { z } from "zod";

import type { TRPCRouterRecord } from "@trpc/server";
import { publicProcedure } from "../../trpc";
import { appointmentService } from "./service/appointment.service";

export const appointmentRouter = {
	getAppointmentsByPatientId: publicProcedure
		.input(z.string())
		.query(async ({ input }) => {
			return appointmentService.getAppointmentsByPatientId(input);
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
		.mutation(async ({ input }) => {
			return appointmentService.createAppointment(input);
		}),
} satisfies TRPCRouterRecord;
