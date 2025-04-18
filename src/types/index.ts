export interface Discipline {
  name: string
  subjects: Subjects[]
}

export interface Subjects {
  name: string
}

export interface StudySession {
  subject: string
  discipline: string
  duration: number
  timestamp: number
}

export interface TimerState {
  isRunning: boolean
  elapsedTime: number
  timestampStart: number
  selectedSubject: string | null
  selectedDiscipline: string | null
}

export interface DisciplineState {
  name: string
  subjects: string[]
}

export type SubjectTable = { name: string; duration: number }
