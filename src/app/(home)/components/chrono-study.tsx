import { Card, CardContent } from "@/components/ui/card";

export default function ChronoStudyComponent() {
	return (
		<div className="flex flex-col">
			<h1 className="text-2xl font-bold mb-4">ChronoStudy</h1>
			<Card className="flex w-full h-[85dvh] py-4 font-clockicons">
				<CardContent className="overflow-auto px-6">00:00:00</CardContent>
			</Card>
		</div>
	);
}
