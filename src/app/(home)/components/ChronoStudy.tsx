"use client";
import { Card, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { disciplinesData } from "@/lib/discipline-data";
import { useTimerStore } from "@/store/timerStore";
import { Timer } from "./Timer";

const FormSchema = z.object({
	discipline: z.string().nonempty(),
	subject: z.string().nonempty(),
});

export function ChronoStudy() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});

	const { selectedSubject, setDiscipline, selectedDiscipline, setSubject } =
		useTimerStore();

	const subjects = disciplinesData.find(
		(discipline) => discipline.discipline === selectedDiscipline,
	)?.subjects;

	const onSubmit = (data: z.infer<typeof FormSchema>) => {
		console.log(data);
	};

	return (
		<div className="flex flex-col">
			<h1 className="text-2xl font-bold mb-4">ChronoStudy</h1>
			<Card className="flex w-full lg:py-12 py-4 items-center lg:max-h-[40dvh] overflow-auto">
				<CardContent className="px-4 lg:w-2xl w-full">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="flex w-full flex-col space-y-6"
						>
							<div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
								<FormField
									control={form.control}
									name="discipline"
									render={() => (
										<FormItem className="flex-1">
											<FormLabel>Disiplina</FormLabel>
											<Select
												onValueChange={(e) => {
													setDiscipline(e);
													setSubject("");
												}}
												value={selectedDiscipline || ""}
											>
												<FormControl>
													<SelectTrigger className="w-full">
														<SelectValue placeholder="Selecione uma discipline" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{disciplinesData.map(({ discipline }) => (
														<SelectItem key={discipline} value={discipline}>
															{discipline}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="subject"
									render={() => (
										<FormItem className="flex-1">
											<FormLabel>Tema</FormLabel>
											<Select
												onValueChange={setSubject}
												value={selectedSubject || ""}
											>
												<FormControl>
													<SelectTrigger className="w-full">
														<SelectValue placeholder="Selecione um tema" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{subjects?.map((subject) => (
														<SelectItem key={subject} value={subject}>
															{subject}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<Timer />
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
