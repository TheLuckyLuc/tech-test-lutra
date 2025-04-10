import Link from "next/link";

import { HydrateClient, api } from "@lutra/trpc/server";
import { formatDate } from "@lutra/utils/date";

export default async function PatientView({
	params,
}: { params: Promise<{ patientId: string }> }) {
	const { patientId } = await params;
	const patient = await api.patient.getPatientById(patientId);

	return (
		<HydrateClient>
			<div className="space-y-4 p-4 sm:p-6 lg:p-8">
				<header>
					<div className="flex items-center justify-between">
						<h3 className="font-semibold text-lg">Patient Details</h3>
						<Link href="/">Back to home</Link>
					</div>
				</header>
				<main>
					{patient && (
						<>
							<p className="text-gray-600">First name: {patient.firstName}</p>
							<p className="text-gray-600">Last name: {patient.lastName}</p>
							<p className="text-gray-600">
								Date of birth: {patient.dateOfBirth}
							</p>
							<p className="text-gray-600">Email: {patient.email}</p>
							{patient.updatedAt && (
								<p className="text-gray-600">
									Last updated: {formatDate(patient.updatedAt)}
								</p>
							)}
						</>
					)}
				</main>
			</div>
		</HydrateClient>
	);
}
