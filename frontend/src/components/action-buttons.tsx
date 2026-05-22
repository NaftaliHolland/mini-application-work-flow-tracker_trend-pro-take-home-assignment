'use client';

import { Button } from "@/components/ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface ActionButtonsProps {
	applicationId: number;
	status: string;
	isEditing: boolean;
	setIsEditing: (value: boolean) => void;
}

export default function ActionButtons({
	applicationId,
	status,
	isEditing,
	setIsEditing,
}: ActionButtonsProps) {
	const handleEdit = () => {
		setIsEditing(!isEditing);
	};

	const queryClient = useQueryClient()

	const submitMutation = useMutation(
		{
			mutationFn: () => {
				return fetch(`http://localhost:8000/api/applications/${applicationId}/submit`, {
					method: "POST"
				}
				);
			},
			onSuccess: () => queryClient.invalidateQueries({ queryKey: ['application'] })
		}
	)

	const startReviewMutation = useMutation(
		{
			mutationFn: () => {
				return fetch(`http://localhost:8000/api/applications/${applicationId}/reviews`, {
					method: "POST"
				}
				);
			},
			onSuccess: () => queryClient.invalidateQueries({ queryKey: ['application'] })
		}
	)

	const approveMutation = useMutation(
		{
			mutationFn: () => {
				return fetch(`http://localhost:8000/api/applications/${applicationId}`, {
					method: "PATCH",
					body: JSON.stringify({ "status": "approved" })
				}
				);
			},
			onSuccess: () => queryClient.invalidateQueries({ queryKey: ['application'] })
		}
	)

	return (
		<div className="flex gap-3">
			{status === 'draft' && (
				<>
					<Button
						variant="outline"
					>
						Edit
					</Button>
					<Button
						variant="outline"
						onClick={() => submitMutation.mutate()}
						disabled={submitMutation.isPending}
					>
						{submitMutation.isPending ?
							"Submitting ..." :
							"Submit"
						}
					</Button>
				</>
			)}

			{status === 'submitted' && (
				<Button
					variant="outline"
					onClick={() => startReviewMutation.mutate()}
					disabled={startReviewMutation.isPending}
				>
					{startReviewMutation.isPending ?
						"Loading ..." :
						"Start Review"
					}
				</Button>
			)}

			{status === 'under_review' && (
				<>
					<Button
						variant="outline"
						onClick={() => approveMutation.mutate()}
					>
						{approveMutation.isPending ?
							"Loading ..." :
							"Approve"
						}
					</Button>
					<Button
						variant="outline"
					>
						Need More Information
					</Button>
					<Button
						variant="destructive"
					>
						Reject
					</Button>
				</>
			)
			}

			{status === 'need_more_information' && (
				<>
					<Button
						variant="outline"
					>
						Edit
					</Button>
					<Button
						variant="outline"
					>
						Resubmit
					</Button>
				</>
			)
			}
		</div>
	);
}
