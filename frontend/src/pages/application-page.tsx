import { useParams } from "react-router"
import { useQuery } from "@tanstack/react-query"
import type { Application } from "./applications-page"
import ActionButtons from "@/components/action-buttons"
import { useState } from "react"
import { Link } from "react-router"

export default function ApplicationDetailPage() {
	const [isEditing, setIsEditing] = useState<boolean>(false)

	let params = useParams()

	const applicationId = params.applicationId

	const { isPending, data: application, error } = useQuery(
		{
			queryKey: ["application", applicationId],
			queryFn: async (): Promise<Application> => {
				const response = await fetch(`http://localhost:8000/api/applications/${applicationId}`)

				return await response.json()
			}
		}
	)

	if (isPending) return "Loading ..."

	if (error) return "An error occured" + error.message

	const formatDate = (dateString: string | null) => {
		if (!dateString) return 'Not submitted';
		return new Date(dateString).toLocaleDateString();
	};

	return (
		<div className="max-w-4xl mx-auto px-6 py-12">

			<div className="pb-12">
				<Link to="/applications">Back</Link>
			</div>

			<div className="flex items-start justify-between mb-12">
				<div>
					<p className="text-muted-foreground text-sm mb-2">Tracking Number</p>
					<h1 className="text-4xl font-light tracking-tight mb-4">{application.tracking_number}</h1>
					<div className="flex flex-col gap-2 mb-2">
						<p className="text-muted-foreground text-sm">Type: <span className="text-gray-900 text-sm uppercase">{application.application_type}</span></p>
						<p className="text-muted-foreground text-sm">Status: <span className="text-gray-900 text-sm uppercase">{application.status}</span></p>
					</div>
				</div>
				{/*<div className="flex items-center gap-3">
						<StatusBadge status={application.status} />
						<span className="text-muted-foreground text-sm capitalize">{application.application_type}</span>
					</div>
				</div>*/}
				<ActionButtons
					applicationId={application.id}
					status={application.status}
					isEditing={isEditing}
					setIsEditing={setIsEditing}
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
				<div className="md:col-span-2">
					<section className="mb-12">
						<h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6">
							Applicant Information
						</h2>
						<div className="space-y-6">
							<div className="border-b border-border pb-4">
								<p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Full Name</p>
								<p className="text-lg text-foreground">{application.applicant_name}</p>
							</div>
							<div className="border-b border-border pb-4">
								<p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Email</p>
								<p className="text-lg text-foreground">{application.applicant_email}</p>
							</div>
							{application.company_name && (
								<div className="border-b border-border pb-4">
									<p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Company</p>
									<p className="text-lg text-foreground">{application.company_name}</p>
								</div>
							)}
						</div>
					</section>

					{application.description && (
						<section className="mb-12">
							<h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6">
								Description
							</h2>
							<p className="text-foreground leading-relaxed">{application.description}</p>
						</section>
					)}

					{application.reviewer_comment && (
						<section>
							<h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6">
								Reviewer Comment
							</h2>
							<div className="bg-muted/50 border border-border rounded-lg p-4">
								<p className="text-foreground">{application.reviewer_comment}</p>
							</div>
						</section>
					)}
				</div>

				<div>
					<h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6">Timeline</h2>
					<div className="space-y-6">
						<div>
							<p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Created</p>
							<p className="text-foreground">{formatDate(application.created_at)}</p>
						</div>
						<div>
							<p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Last Updated</p>
							<p className="text-foreground">{formatDate(application.updated_at)}</p>
						</div>
						<div>
							<p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Submitted</p>
							<p className="text-foreground">{formatDate(application.submitted_at)}</p>
						</div>
						<div>
							<p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Reviewed</p>
							<p className="text-foreground">{formatDate(application.reviewed_at)}</p>
						</div>
					</div>
				</div>
			</div>
		</div >
	)
}
