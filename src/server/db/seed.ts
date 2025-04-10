import { sql } from "drizzle-orm";
import {
	boolean,
	date,
	integer,
	pgTable,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/postgres-js";
import { reset, seed } from "drizzle-seed";
import postgres from "postgres";
import "dotenv/config";

import * as schema from "@lutra/server/db/schema";

const patient = pgTable("lutra-tech-test_patient", {
	id: integer().primaryKey().generatedByDefaultAsIdentity(),
	firstName: varchar({ length: 100 }).notNull(),
	lastName: varchar({ length: 100 }).notNull(),
	dateOfBirth: date().notNull(),
	email: varchar({ length: 256 }),
	isActive: boolean().default(true).notNull(),
	createdAt: timestamp({ withTimezone: true })
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
});

const seedDatabase = async () => {
	try {
		console.log("Connecting to database...");
		const conn = postgres(process.env.DATABASE_URL as string, {
			max: 1,
			ssl: process.env.NODE_ENV === "production",
		});

		const db = drizzle(conn, { schema });

		console.log("Resetting database...");
		await reset(db, schema);

		console.log("Seeding database...");
		await seed(db, { patient });

		console.log("Database seeded successfully");
		process.exit(0);
	} catch (error) {
		console.error("Error seeding database:", error);
		process.exit(1);
	}
};

seedDatabase();
