import type { TRPCRouterRecord } from '@trpc/server';

import { publicProcedure } from '../trpc';
import { getPatients } from '../queries/patient';

export const patientRouter = {
  getPatients: publicProcedure.query(getPatients),
} satisfies TRPCRouterRecord;
