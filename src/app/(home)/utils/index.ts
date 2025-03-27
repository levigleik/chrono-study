import { StudySession } from '@/types'

export const calculateTopStudied = (
  sessions: StudySession[],
  type: 'subject' | 'discipline',
) => {
  const studyMap = new Map<string, number>()

  for (const session of sessions) {
    const key = session[type]
    studyMap.set(key, (studyMap.get(key) || 0) + session.duration)
  }

  return Array.from(studyMap.entries())
    .map(([name, totalDuration]) => ({ name, totalDuration }))
    .sort((a, b) => b.totalDuration - a.totalDuration)
    .slice(0, 3)
}
