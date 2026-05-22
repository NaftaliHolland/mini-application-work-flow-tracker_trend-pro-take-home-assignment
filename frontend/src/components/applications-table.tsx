import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import type { Application } from "@/pages/applications-page"
import { useNavigate } from "react-router"

interface ApplicationTableProps {
	applications: Application[]
}

export function ApplicationsTable({ applications }: ApplicationTableProps) {

	const navigate = useNavigate();

	return (

		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Tracking No.</TableHead>
					<TableHead>Applicant Name</TableHead>
					<TableHead>Company Name</TableHead>
					<TableHead>Application Type</TableHead>
					<TableHead>Status</TableHead>
					<TableHead className="text-right">Created date</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody className="text-gray-700">
				{applications.map((application) => (
					<TableRow
						key={application.id}
						onClick={() => navigate(`/applications/${application.id}`)}
						className="cursor-pointer"
					>
						<TableCell className="font-medium">{application.tracking_number}</TableCell>
						<TableCell>{application.applicant_name}</TableCell>
						<TableCell>{application.company_name ? application.company_name : "-"}</TableCell>
						<TableCell>{application.application_type}</TableCell>
						<TableCell>{application.status}</TableCell>
						<TableCell className="text-right">{application.created_at}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
