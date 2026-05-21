import { Link, useParams } from "react-router"

export default function ApplicationDetailPage() {
	let params = useParams()

	return (<div>
		<Link to="/applications">Back to list</Link>
		<p>{params.applicationId}</p>
	</div>)
}
