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

	const handleSubmit = () => {
		submitMutation.mutate()
	};

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
						onClick={handleSubmit}
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
				>
					Start Review
				</Button>
			)}

			{status === 'under_review' && (
				<>
					<Button
						variant="outline"
					>
						Approve
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
