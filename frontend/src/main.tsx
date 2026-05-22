import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { BrowserRouter, Routes, Route } from "react-router"
import ApplicationsPage from "@/pages/applications-page"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import ApplicationDetailPage from "@/pages/application-page"


const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
	<QueryClientProvider client={queryClient}>
		<StrictMode>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="/applications" element={<ApplicationsPage />} />
					<Route path="/applications/:applicationId" element={<ApplicationDetailPage />} />
				</Routes>
			</BrowserRouter>
		</StrictMode>
	</QueryClientProvider>
)
