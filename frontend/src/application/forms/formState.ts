export interface FormState<T> {
  value: T
  dirty: boolean
  valid: boolean
  submitting: boolean
  error?: string
}

export function createFormState<T>(
  value: T,
): FormState<T> {
  return {
    value,
    dirty: false,
    valid: true,
    submitting: false,
  }
}
