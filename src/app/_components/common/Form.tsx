import { type SubmitHandler, useForm } from "react-hook-form";

interface FormProps {
	onSubmit: SubmitHandler<FormInputs>;
}

export interface FormInputs {
	date: string;
	reason: string;
	notes: string;
}

const Form = ({ onSubmit }: FormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormInputs>();

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
				<div>
					<label className="text-gray-700" htmlFor="date">
						Date
					</label>
					<input
						id="date"
						type="date"
						className="mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
						aria-invalid={errors.date ? "true" : "false"}
						{...register("date", { required: true })}
					/>
					{errors.date?.type === "required" && (
						<p role="alert" className="text-red-600">
							A date is required
						</p>
					)}
				</div>

				<div>
					<label className="text-gray-700" htmlFor="reason">
						Reason
					</label>
					<input
						id="reason"
						type="text"
						className="mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
						aria-invalid={errors.date ? "true" : "false"}
						{...register("reason", { required: true })}
					/>
					{errors.date?.type === "required" && (
						<p role="alert" className="text-red-600">
							A reason is required
						</p>
					)}
				</div>

				<div className="col-span-2">
					<label className="text-gray-700" htmlFor="notes">
						Notes (optional)
					</label>
					<textarea
						id="notes"
						className="mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
						{...register("notes")}
					/>
				</div>
			</div>

			<div className="mt-6 flex justify-end">
				<button
					type="submit"
					className="transform cursor-pointer rounded-md bg-gray-700 px-8 py-2.5 text-white leading-5 transition-colors duration-300 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
				>
					Create
				</button>
			</div>
		</form>
	);
};

export default Form;
