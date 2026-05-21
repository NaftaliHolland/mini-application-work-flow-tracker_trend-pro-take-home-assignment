import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router"

interface Application {
	id: number
	tracking_number: string
	applicant_name: string
	applicant_email: string
	company_name: string
	application_type: string
	description?: string
	status: string
	reviewer_comment?: string
	created_at: string
	updated_at?: string
	submitted_at?: any
	reviewed_at?: any
}

export default function ApplicationsPage() {

	const { isPending, error, data } = useQuery({
		queryKey: ["applications"],
		queryFn: async (): Promise<Application[]> => {
			const response = await fetch(
				'http://localhost:8000/api/applications'
			)

			return await response.json()
		}
	})

	if (isPending) return "Loading ..."

	if (error) return "An error occured" + error.message

	return (
		<div>
			<p>Applications</p>
			<div className="flex flex-col gap-4">
				{data.map((application) =>
					<Link to={`/applications/${application.id}`}>{application.tracking_number}</Link>
				)
				}
			</div>
		</div>
	)

}
