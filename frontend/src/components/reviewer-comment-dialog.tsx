import React from "react"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldLabel } from "@/components/ui/field"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Textarea } from "@/components/ui/textarea"

interface ReviewerCommentDialogProps {
	status: string
	action: string
	applicationId: number
}

export default function ReviewerCommentDialog({ status, action, applicationId }: ReviewerCommentDialogProps) {

	const queryClient = useQueryClient()

	const needMoreInfoMutation = useMutation(
		{
			mutationFn: (comment: string) => {
				return fetch(`http://localhost:8000/api/applications/${applicationId}`, {
					method: "PATCH",
					body: JSON.stringify({ "status": status, "reviewer_comment": comment })
				}
				);
			},
			onSuccess: () => queryClient.invalidateQueries({ queryKey: ['application'] })
		}
	)

	function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget)
		const comment = formData.get("comment")

		if (typeof comment !== "string") return;

		needMoreInfoMutation.mutate(comment)
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={status == "rejected" ? "destructive" : "outline"}>
					{action}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-sm">
				<form onSubmit={onSubmit}>
					<DialogHeader>
						<DialogTitle className="pb-2">Reviewer Comment</DialogTitle>
						<DialogDescription className="sr-only">
							Comments from reviewer
						</DialogDescription>
					</DialogHeader>
					<Field>
						<FieldLabel htmlFor="comment" className="sr-only">Comment</FieldLabel>
						<Textarea
							id="comment"
							name="comment"
							required={true}
							placeholder="Write comment ..."
						/>
					</Field>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button
							type="submit"
							disabled={needMoreInfoMutation.isPending}
						>
							{needMoreInfoMutation.isPending ?
								"Loading ..." :
								"Save"
							}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
