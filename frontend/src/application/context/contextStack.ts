import type { DomainContext } from "./domainContext"

export interface ContextStack {
  push(value: DomainContext): void
  pop(): DomainContext | undefined
  current(): DomainContext | undefined
  list(): DomainContext[]
}

export function createContextStack(): ContextStack {
  const values: DomainContext[] = []

  return {
    push(value) {
      values.push(value)
    },

    pop() {
      return values.pop()
    },

    current() {
      return values[values.length - 1]
    },

    list() {
      return [...values]
    },
  }
}
