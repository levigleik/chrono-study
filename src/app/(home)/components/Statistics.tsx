"use client";
import { Card, CardContent } from "@/components/ui/card";

import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";

const chartData = [
	{ browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
	{ browser: "safari", visitors: 200, fill: "var(--color-safari)" },
	{ browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
	{ browser: "edge", visitors: 173, fill: "var(--color-edge)" },
	{ browser: "other", visitors: 190, fill: "var(--color-other)" },
];

const chartConfig = {
	visitors: {
		label: "Estudos",
	},
	chrome: {
		label: "Álgebra Linear",
		color: "var(--chart-1)",
	},
	safari: {
		label: "Mecânica Clássica",
		color: "var(--chart-2)",
	},
	firefox: {
		label: "Revolução Francesa",
		color: "var(--chart-3)",
	},
	edge: {
		label: "Cálculo Diferencial",
		color: "var(--chart-4)",
	},
	other: {
		label: "Eletromagnetismo",
		color: "var(--chart-5)",
	},
} satisfies ChartConfig;

export function Statistics() {
	return (
		<div className="flex flex-col ">
			<h1 className="text-2xl font-bold my-2">Statistics</h1>
			<Card className="flex w-full py-0 items-center h-[40dvh] justify-center overflow-auto">
				<CardContent className="px-4 lg:w-2xl w-full">
					<ChartContainer
						config={chartConfig}
						className="mx-auto aspect-square max-h-[280px]"
					>
						<PieChart>
							<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
							<Pie
								data={chartData}
								dataKey="visitors"
								nameKey="browser"
								strokeWidth={5}
							/>
							<ChartLegend
								content={<ChartLegendContent nameKey="browser" />}
								className="-translate-y-2 flex-wrap gap-2"
							/>
						</PieChart>
					</ChartContainer>
				</CardContent>
			</Card>
		</div>
	);
}
