"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useInterval } from "@/lib/use-interval";
import { useTimerStore } from "@/store/timerStore";
import { PauseIcon, PlayIcon, RotateCcwIcon, SaveIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export function Timer() {
	const [showSaveDialog, setShowSaveDialog] = useState(false);
	const {
		isRunning,
		seconds,
		selectedSubject,
		selectedDiscipline,
		startTimer,
		pauseTimer,
		resetTimer,
		tick,
		saveSession,
	} = useTimerStore();

	const formatTime = (totalSeconds: number) => {
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;
		return `${hours.toString().padStart(2, "0")}:${minutes
			.toString()
			.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
	};

	useInterval(() => {
		if (isRunning) {
			tick();
		}
	}, 1000);

	const handleSave = () => {
		saveSession();
		setShowSaveDialog(false);
		toast.success("Tempo salvo com sucesso!");
	};

	return (
		<div className="flex flex-col  text-center">
			<span className="font-clockicons lg:text-8xl md:text-6xl text-5xl">
				{formatTime(seconds)}
			</span>

			<div className="flex flex-col gap-4 lg:flex-row lg:space-y-0 lg:justify-between w-full mt-4">
				{!isRunning ? (
					<Button
						onClick={startTimer}
						disabled={!selectedSubject || !selectedDiscipline}
						size="lg"
						className="lg:flex-1 w-auto"
					>
						<PlayIcon className="mr-2 h-4 w-4" />
						Iniciar
					</Button>
				) : (
					<Button
						onClick={pauseTimer}
						variant="secondary"
						size="lg"
						className="lg:flex-1 w-auto"
					>
						<PauseIcon className="mr-2 h-4 w-4" />
						Pausar
					</Button>
				)}
				<Button
					onClick={resetTimer}
					variant="outline"
					size="lg"
					className="lg:flex-1 w-auto"
				>
					<RotateCcwIcon className="mr-2 h-4 w-4" />
					Resetar
				</Button>
				<Button
					onClick={() => setShowSaveDialog(true)}
					variant="default"
					size="lg"
					className="lg:flex-1 w-auto"
					disabled={seconds === 0}
				>
					<SaveIcon className="mr-2 h-4 w-4" />
					Salvar
				</Button>
			</div>

			<Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Save Study Session</DialogTitle>
						<DialogDescription>
							Are you sure you want to save this study session? This will reset
							the timer.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button variant="outline" onClick={() => setShowSaveDialog(false)}>
							Cancelar
						</Button>
						<Button onClick={handleSave}>Salvar tempo</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
