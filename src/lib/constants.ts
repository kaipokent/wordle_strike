export const LETTERS = 'abcdefghijklmnopqrstuvwxyz'

export const enum LetterState {
  INITIAL = '',
  CORRECT = 'correct',
  PRESENT = 'present',
  ABSENT = 'absent',
  ERROR = 'error',
}
export type Letter = { letter: string; state: LetterState }
export type KeyboardState = Record<string, LetterState>

export const WORD_LENGTH = 5
export const MAX_GUESSES = 6
