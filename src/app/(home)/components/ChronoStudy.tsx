"use client";
import { Card, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
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
import { disciplinesData } from "@/lib/mock";
import { useEffect } from "react";
import { Timer } from "./Timer";

const FormSchema = z.object({
	discipline: z.string().nonempty(),
	subject: z.string().nonempty(),
});

export function ChronoStudy() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});

	const disciplineWatch = form.watch("discipline");

	const temas = disciplinesData.find(
		(discipline) => discipline.nome === disciplineWatch,
	)?.temas;

	const onSubmit = (data: z.infer<typeof FormSchema>) => {
		console.log(data);
	};

	return (
		<div className="flex flex-col">
			<h1 className="text-2xl font-bold mb-4">ChronoStudy</h1>
			<Card className="flex w-full h-[85dvh] py-4 items-center justify-center">
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
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Disiplina</FormLabel>
											<Select
												onValueChange={field.onChange}
												value={field.value}
											>
												<FormControl>
													<SelectTrigger className="w-full">
														<SelectValue placeholder="Selecione uma discipline" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{disciplinesData.map((discipline) => (
														<SelectItem
															key={discipline.nome}
															value={discipline.nome}
														>
															{discipline.nome}
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
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel>Tema</FormLabel>
											<Select
												onValueChange={field.onChange}
												value={field.value}
											>
												<FormControl>
													<SelectTrigger className="w-full">
														<SelectValue placeholder="Selecione um tema" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{temas?.map((tema) => (
														<SelectItem key={tema} value={tema}>
															{tema}
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
