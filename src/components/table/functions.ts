import { format, isValid, parseISO } from 'date-fns'

export function flattenObject(obj: any, parentKey = ''): any {
  let flatObject: any = {}
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      const newParentKey = parentKey ? `${parentKey}.${key}` : key
      const childObject = flattenObject(obj[key], newParentKey)
      flatObject = { ...flatObject, ...childObject }
    } else {
      const newKey = parentKey ? `${parentKey}.${key}` : key
      flatObject[newKey] = obj[key]
    }
  }
  return flatObject
}

export const isDate = (dateString: string): boolean => {
  // Tenta converter a string para uma data
  const date = parseISO(dateString)

  // verifica se tem 24 caracteres
  if (dateString.length !== 24) return false

  // Verifica se a data é válida
  return isValid(date)
}
