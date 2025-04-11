"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";

import Form, { type FormInputs } from "@lutra/app/_components/common/Form";
import { api } from "@lutra/trpc/react";
import { formatDate } from "@lutra/utils/date";

export default function PatientView() {
	const { patientId } = useParams();

	const patientResponse = api.patient.getPatientById.useQuery(
		patientId as string,
	);
	const appointmentsResponse =
		api.appointment.getAppointmentsByPatientId.useQuery(patientId as string);

	const appointmentCreator = api.appointment.createAppointment.useMutation({
		onSuccess: () => {
			appointmentsResponse.refetch(); // Refetch appointments after creating a new one
		},
	});

	const [shouldRenderForm, setShouldRenderForm] = useState(false);

	const onSubmit: SubmitHandler<FormInputs> = (data) => {
		appointmentCreator.mutate(
			{
				patientId: Number(patientId),
				scheduledFor: new Date(data.date),
				status: "SCHEDULED",
				reason: data.reason,
				notes: data.notes ? data.notes : undefined,
			},
			{
				onSuccess: () => {
					setShouldRenderForm(false);
				},
			},
		);
	};

	return (
		<div className="space-y-4 p-4 sm:p-6 lg:p-8">
			<header>
				<div className="flex items-center justify-between">
					<h3 className="font-semibold text-lg">Patient Details</h3>
					<Link
						href="/"
						className="transform cursor-pointer rounded-md bg-red-700 px-8 py-2.5 text-white leading-5 transition-colors duration-300 hover:bg-red-600 focus:bg-red-600 focus:outline-none"
					>
						Back to home
					</Link>
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

				<section className="my-6 flex items-center justify-center">
					{shouldRenderForm ? (
						<div className="max-w-4xl rounded-md bg-white p-6 shadow-md">
							<h2 className="font-semibold text-gray-700 text-lg capitalize">
								New appointment
							</h2>
							<Form onSubmit={onSubmit} />
						</div>
					) : (
						<button
							onClick={() => setShouldRenderForm(true)}
							className="transform cursor-pointer rounded-md bg-gray-700 px-8 py-2.5 text-white leading-5 transition-colors duration-300 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
						>
							Add Appointment
						</button>
					)}
				</section>

				<h3 className="font-semibold text-lg">Patient Appointments</h3>
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
										Scheduled for: {formatDate(appointment.scheduledFor)}
									</p>
									{appointment.notes && (
										<p className="text-gray-600">Notes: {appointment.notes}</p>
									)}
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
