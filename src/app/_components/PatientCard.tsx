import Link from "next/link";

interface PatientCardProps {
	patientId: number;
	firstName: string;
	lastName: string;
	isActive: boolean;
}

const PatientCard = ({
	firstName,
	lastName,
	isActive,
	patientId,
}: PatientCardProps) => {
	return (
		<div className="group relative rounded border border-gray-200 bg-white p-2">
			<div className="h-20">
				<div className="relative h-full overflow-hidden rounded bg-gray-50">
					<svg
						className="absolute inset-0 h-full w-full stroke-blue-100"
						fill="none"
					>
						<title>Placeholder</title>
						<defs>
							<pattern
								id="pattern-1"
								x="0"
								y="0"
								width="10"
								height="10"
								patternUnits="userSpaceOnUse"
							>
								<path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3" />
							</pattern>
						</defs>
						<rect
							stroke="none"
							fill="url(#pattern-1)"
							width="100%"
							height="100%"
						/>
					</svg>
				</div>
			</div>
			<h3 className="mt-2 font-semibold">
				<Link
					href={`/patient/${patientId}`}
					className="focus:outline-none group-hover:text-blue-600"
				>
					<span className="absolute inset-0" aria-hidden={true} />
					{firstName} {lastName}
				</Link>
			</h3>
			<p className="text-gray-600">{isActive ? "Active" : "Inactive"}</p>
		</div>
	);
};

export default PatientCard;
