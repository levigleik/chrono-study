import ChronoStudyComponent from "./components/chrono-study";
import HistoryComponent from "./components/history";

export default function Home() {
	return (
		<div className="flex w-full gap-4">
			<div className="flex-2/3 h-full">
				<ChronoStudyComponent />
			</div>

			<div className="flex-1/3">
				<HistoryComponent />
			</div>
		</div>
	);
}
