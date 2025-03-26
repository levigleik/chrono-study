"use client";

import { ErrorBoundary } from "react-error-boundary"
import { ToastContainer, Zoom } from "react-toastify"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

import { ThemeProvider } from "@/components/providers/theme-provider"
import { Button } from "@/components/ui/button"

export function Providers({ children }: { children: React.ReactNode }) {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(typeof window !== "undefined");
	}, []);

	if (!isClient) {
		return null;
	}

	return (
		<ErrorBoundary
			fallbackRender={({ resetErrorBoundary }: any) => (
				<div className="flex h-screen flex-col items-center justify-center">
					<h1 className="text-2xl font-bold">Ocorreu um erro</h1>
					<Button
						className="mt-4"
						onClick={() => {
							resetErrorBoundary();
						}}
					>
						Tentar novamente
					</Button>
				</div>
			)}
		>
			<ThemeProvider attribute="class" defaultTheme="dark">
				<ToastContainer
					pauseOnHover={false}
					pauseOnFocusLoss={false}
					position="top-center"
					autoClose={4000}
					hideProgressBar={false}
					newestOnTop
					closeOnClick
					transition={Zoom}
					rtl={false}
					draggable
					theme="dark"
					toastClassName={cn(
						"min-h-10 cursor-pointer justify-between",
						"overflow-hidden rounded-[25px] bg-gray-900 p-3 text-white",
						"md:mb-2 mb-8 md:m-0 m-4",
					)}
				/>
				{children}
			</ThemeProvider>
		</ErrorBoundary>
	);
}
