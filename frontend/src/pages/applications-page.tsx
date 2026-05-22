import { Link } from "react-router"
import { ApplicationsTable } from "@/components/applications-table"
import { useQuery } from "@tanstack/react-query"

export interface Application {
	id: number
	tracking_number: string
	applicant_name: string
	applicant_email: string
	company_name: string
	application_type: "recordation" |
	"renewal" |
	"change_of_ownership" |
	"change_of_name" |
	"discontinuation"

	description?: string
	status: "draft" |
	"under_review" |
	"submitted" |
	"under_review" |
	"need_more_information" |
	"approved" |
	"rejected"
	reviewer_comment?: string
	created_at: string
	updated_at?: string
	submitted_at?: string
	reviewed_at?: string
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
