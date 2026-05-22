"use client"

import React, { useState } from "react"
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
import { Label } from "@/components/ui/label"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

export default function ApplicationFormDialog() {
	const [formData, setFormData] = useState({
		applicant_name: '',
		applicant_email: '',
		company_name: '',
		application_type: '',
		description: '',
	})

	const [dialogOpen, setDialogOpen] = useState<boolean>(false);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSelectChange = (value: string) => {
		setFormData((prev) => ({
			...prev,
			application_type: value,
		}))
	}

	const queryClient = useQueryClient()

	const addApplicationMutation = useMutation(
		{
			mutationFn: () => {
				return fetch(`http://localhost:8000/api/applications`, {
					method: "POST",
					body: JSON.stringify(formData)
				}
				);
			},
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['applications'] })
				setDialogOpen(false)
				setFormData({
					applicant_name: '',
					applicant_email: '',
					company_name: '',
					application_type: '',
					description: '',
				})
			}
		}
	)

	function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		addApplicationMutation.mutate()
	}


	return (
		<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
			<DialogTrigger asChild>
				<Button onClick={() => setDialogOpen(true)}>
					Add Application
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-sm">
				<form onSubmit={onSubmit} className="space-y-5">
					<div className="space-y-2">
						<Label htmlFor="applicant_name" className="text-neutral-300">
							Applicant Name
						</Label>
						<Input
							id="applicant_name"
							name="applicant_name"
							type="text"
							placeholder="John Doe"
							value={formData.applicant_name}
							onChange={handleInputChange}
							required
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="applicant_email" className="text-neutral-300">
							Applicant Email
						</Label>
						<Input
							id="applicant_email"
							name="applicant_email"
							type="email"
							placeholder="john@example.com"
							value={formData.applicant_email}
							onChange={handleInputChange}
							required
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="company_name" className="text-neutral-300">
							Company Name
						</Label>
						<Input
							id="company_name"
							name="company_name"
							type="text"
							placeholder="Acme Inc."
							value={formData.company_name}
							onChange={handleInputChange}
							required
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="application_type" className="text-neutral-300">
							Application Type
						</Label>
						<Select value={formData.application_type} onValueChange={handleSelectChange}>
							<SelectTrigger
								id="application_type"
							>
								<SelectValue placeholder="Select application type" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="partnership">Partnership</SelectItem>
								<SelectItem value="integration">Integration</SelectItem>
								<SelectItem value="sponsorship">Sponsorship</SelectItem>
								<SelectItem value="employment">Employment</SelectItem>
								<SelectItem value="other">Other</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<Label htmlFor="description" className="text-neutral-300">
							Description
						</Label>
						<Textarea
							id="description"
							name="description"
							placeholder="Tell us more about your application..."
							value={formData.description}
							onChange={handleInputChange}
							rows={5}
							required
						/>
					</div>

					<Button
						type="submit"
						disabled={addApplicationMutation.isPending}
					>
						{addApplicationMutation.isPending ? 'Submitting...' : 'Submit Application'}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}
