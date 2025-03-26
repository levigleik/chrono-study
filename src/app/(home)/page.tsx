import { ChronoStudy } from "./components/ChronoStudy";
import { History } from "./components/History";
import { Statistics } from "./components/Statistics";

export default function Home() {
	return (
		<div className="flex w-full flex-col lg:flex-row xl:gap-8 gap-4">
			<div className="flex-2/3 flex justify-between flex-col">
				<ChronoStudy />
				<Statistics />
			</div>

			<div className="flex-1/3">
				<History />
			</div>
		</div>
	);
}
