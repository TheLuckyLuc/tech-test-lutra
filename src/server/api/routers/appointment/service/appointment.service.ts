import {
	type CreateAppointmentParams,
	appointmentRepository,
} from "../repository/appointment.repository";

class AppointmentService {
	async getAppointmentsByPatientId(input: string) {
		const id = Number(input);

		if (Number.isNaN(id)) {
			throw new Error(`Invalid ID: ${input}. ID must be an integer.`);
		}

		return await appointmentRepository.getAppointmentsByPatientId(id);
	}

	async createAppointment(options: CreateAppointmentParams) {
		try {
			await appointmentRepository.createAppointment(options);
		} catch (error) {
			console.error("Error creating appointment: ", error);
			throw new Error(
				`Failed to create appointment for patient ID "${options.patientId}"`,
			);
		}
	}
}

export const appointmentService = new AppointmentService();
