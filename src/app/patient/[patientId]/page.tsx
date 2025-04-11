"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { api } from "@lutra/trpc/react";
import { formatDate } from "@lutra/utils/date";

export default function PatientView() {
	const { patientId } = useParams();
	const patientResponse = api.patient.getPatientById.useQuery(
		patientId as string,
	);
	const appointmentsResponse =
		api.appointment.getAppointmentsByPatientId.useQuery(patientId as string);

	return (
		<div className="space-y-4 p-4 sm:p-6 lg:p-8">
			<header>
				<div className="flex items-center justify-between">
					<h3 className="font-semibold text-lg">Patient Details</h3>
					<Link href="/">Back to home</Link>
				</div>
			</header>
			<main>
				{patientResponse.data ? (
					<>
						<p className="text-gray-600">
							First name: {patientResponse.data.firstName}
						</p>
						<p className="text-gray-600">
							Last name: {patientResponse.data.lastName}
						</p>
						<p className="text-gray-600">
							Date of birth: {patientResponse.data.dateOfBirth}
						</p>
						<p className="text-gray-600">Email: {patientResponse.data.email}</p>
						{patientResponse.data.updatedAt && (
							<p className="text-gray-600">
								Last updated: {formatDate(patientResponse.data.updatedAt)}
							</p>
						)}
					</>
				) : (
					<p className="text-gray-600">Loading...</p>
				)}
				<div className="mt-6 flex items-center justify-between">
					<h3 className="font-semibold text-lg">Appointments</h3>
				</div>
				<div className="mt-6">
					<div className="grid grid-cols-1 gap-4 pb-1 sm:grid-cols-2 lg:grid-cols-3">
						{appointmentsResponse.data ? (
							appointmentsResponse.data.map((appointment) => (
								<div
									key={appointment.id}
									className="group relative rounded border border-gray-200 bg-white p-2"
								>
									<h3 className="mt-2 font-semibold">{appointment.reason}</h3>
									<p className="text-gray-600">Status: {appointment.status}</p>
									<p className="text-gray-600">
										Patient ID: {appointment.patientId}
									</p>
								</div>
							))
						) : (
							<div className="text-center text-gray-500">Loading...</div>
						)}
					</div>
				</div>
			</main>
		</div>
	);
}
