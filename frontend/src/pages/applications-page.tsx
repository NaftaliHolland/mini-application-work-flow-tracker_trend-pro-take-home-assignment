import { Link } from "react-router"
import { ApplicationsTable } from "@/components/applications-table"
import { useQuery } from "@tanstack/react-query"

export interface Application {
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
		<div className="px-12 py-8 pspace-y-4">
			<p>Applications</p>
			<ApplicationsTable applications={data} />
		</div>
	)

}
