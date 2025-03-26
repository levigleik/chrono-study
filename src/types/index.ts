export interface Subject {
	id: string;
	name: string;
	disciplines: Discipline[];
}

export interface Discipline {
	id: string;
	name: string;
}

export interface StudySession {
	id: string;
	subjectId: string;
	disciplineId: string;
	duration: number;
	timestamp: number;
}

export interface TimerState {
	isRunning: boolean;
	seconds: number;
	selectedSubject: string | null;
	selectedDiscipline: string | null;
}
