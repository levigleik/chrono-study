"use client";
import { Card, CardContent } from "@/components/ui/card";
import { z } from "zod";

import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";
import { LabelList, Pie, PieChart } from "recharts";

const chartData = [
	{ browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
	{ browser: "safari", visitors: 200, fill: "var(--color-safari)" },
	{ browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
	{ browser: "edge", visitors: 173, fill: "var(--color-edge)" },
	{ browser: "other", visitors: 190, fill: "var(--color-other)" },
];

const chartConfig = {
	visitors: {
		label: "Visitors",
	},
	chrome: {
		label: "Chrome",
		color: "var(--chart-1)",
	},
	safari: {
		label: "Safari",
		color: "var(--chart-2)",
	},
	firefox: {
		label: "Firefox",
		color: "var(--chart-3)",
	},
	edge: {
		label: "Edge",
		color: "var(--chart-4)",
	},
	other: {
		label: "Other",
		color: "var(--chart-5)",
	},
} satisfies ChartConfig;

const FormSchema = z.object({
	discipline: z.string().nonempty(),
	subject: z.string().nonempty(),
});

export function Statistics() {
	const totalVisitors = useMemo(() => {
		return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
	}, []);

	return (
		<div className="flex flex-col ">
			<h1 className="text-2xl font-bold my-2">Statistics</h1>
			<Card className="flex w-full py-0 items-center h-[40dvh] justify-center overflow-auto">
				<CardContent className="px-4 lg:w-2xl w-full">
					<ChartContainer
						config={chartConfig}
						className="mx-auto aspect-square max-h-[250px]"
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
								className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
							/>
						</PieChart>
					</ChartContainer>
				</CardContent>
			</Card>
		</div>
	);
}
