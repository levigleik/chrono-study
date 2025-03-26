"use client";
import { Card, CardContent } from "@/components/ui/card";

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

export function ChronoStudy() {
	const { selectedSubject, setDiscipline, selectedDiscipline, setSubject } =
		useTimerStore();

	const subjects = disciplinesData.find(
		(discipline) => discipline.discipline === selectedDiscipline,
	)?.subjects;

	return (
		<div className="flex flex-col">
			<h1 className="text-2xl font-bold mb-4">ChronoStudy</h1>
			<Card className="flex w-full lg:py-12 py-4 items-center lg:max-h-[40dvh] overflow-auto">
				<CardContent className="lg:w-2xl flex w-full flex-col space-y-6">
					<div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
						<div className="flex-1">
							<span className="mb-2">Disiplina</span>
							<Select
								onValueChange={(e) => {
									setDiscipline(e);
									setSubject("");
								}}
								value={selectedDiscipline || ""}
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Selecione uma disciplina" />
								</SelectTrigger>
								<SelectContent>
									{disciplinesData.map(({ discipline }) => (
										<SelectItem key={discipline} value={discipline}>
											{discipline}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="flex-1">
							<span className="mb-2">Tema</span>
							<Select onValueChange={setSubject} value={selectedSubject || ""}>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Selecione um tema" />
								</SelectTrigger>
								<SelectContent>
									{subjects?.map((subject) => (
										<SelectItem key={subject} value={subject}>
											{subject}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
					<Timer />
				</CardContent>
			</Card>
		</div>
	);
}
