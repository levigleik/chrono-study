import { ChronoStudy } from "./components/ChronoStudy";
import { History } from "./components/History";

export default function Home() {
	return (
		<div className="flex w-full flex-col lg:flex-row gap-4">
			<div className="flex-2/3 h-full">
				<ChronoStudy />
			</div>

			<div className="flex-1/3">
				<History />
			</div>
		</div>
	);
}
