import { Button } from "@/components/ui/button"
import { Link } from "react-router"

export function App() {
	return (
		<div className="flex items-center justify-center min-h-svh p-6">
			<div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
				<div>
					<h1 className="font-medium">Application Tracking</h1>
					<p>Small application workflow tracker</p>
					<Button asChild>
						<Link to="/applications" className="mt-2">View applications</Link>
					</Button>
				</div>
			</div>
		</div>
	)
}

export default App
