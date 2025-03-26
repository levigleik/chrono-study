"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { StudySession, TimerState } from "../types";

interface TimerStore extends TimerState {
	sessions: StudySession[];
	setSubject: (subjectId: string) => void;
	setDiscipline: (disciplineId: string) => void;
	startTimer: () => void;
	pauseTimer: () => void;
	resetTimer: () => void;
	tick: () => void;
	saveSession: () => void;
}

export const useTimerStore = create<TimerStore>()(
	persist(
		(set, get) => ({
			isRunning: false,
			seconds: 0,
			selectedSubject: null,
			selectedDiscipline: null,
			sessions: [],

			setSubject: (subjectId) => set({ selectedSubject: subjectId }),
			setDiscipline: (disciplineId) =>
				set({ selectedDiscipline: disciplineId }),

			startTimer: () => set({ isRunning: true }),
			pauseTimer: () => set({ isRunning: false }),

			resetTimer: () =>
				set({
					seconds: 0,
					isRunning: false,
					selectedSubject: null,
					selectedDiscipline: null,
				}),

			tick: () => set((state) => ({ seconds: state.seconds + 1 })),

			saveSession: () => {
				const state = get();
				if (
					!state.selectedSubject ||
					!state.selectedDiscipline ||
					state.seconds === 0
				)
					return;

				const newSession: StudySession = {
					id: Date.now().toString(),
					subjectId: state.selectedSubject,
					disciplineId: state.selectedDiscipline,
					duration: state.seconds,
					timestamp: Date.now(),
				};

				set((state) => ({
					sessions: [...state.sessions, newSession],
					seconds: 0,
					isRunning: false,
					selectedSubject: null,
					selectedDiscipline: null,
				}));
			},
		}),
		{
			name: "study-timer-storage",
			version: 1,
		},
	),
);
