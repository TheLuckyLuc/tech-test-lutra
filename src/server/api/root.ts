import { createCallerFactory, createTRPCRouter } from "@lutra/server/api/trpc";
import { appointmentRouter } from "./routers/appointment/appointment.router";
import { helloRouter } from "./routers/hello";
import { patientRouter } from "./routers/patient/patient.router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	hello: helloRouter,
	patient: patientRouter,
	appointment: appointmentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
