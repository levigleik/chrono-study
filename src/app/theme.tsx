"use client";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export default function Theme() {
	const { setTheme, theme } = useTheme();
	return (
		<div>
			<Button
				variant="outline"
				onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			>
				CTHMWWME
			</Button>
		</div>
	);
}
