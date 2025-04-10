import { HydrateClient, api } from "@lutra/trpc/server";

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
						<h3 className="font-semibold text-lg">
							Patient: {patient?.firstName} {patient?.lastName}
						</h3>
					</div>
				</header>
			</div>
		</HydrateClient>
	);
}
