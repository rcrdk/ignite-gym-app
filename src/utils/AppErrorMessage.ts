import { AppError } from './AppError'

export function getErrorMessage(error: unknown, fallbackMessage: string) {
  const isAppError = error instanceof AppError
  const message = isAppError ? error.message : fallbackMessage

  return message
}
