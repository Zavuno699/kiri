export interface SecurityOperations {
  review(subjectId: string): Promise<never>
  access(subjectId: string): Promise<never>
}

function unavailable(): never {
  throw new Error(
    "Security operations are unavailable until verified production HTTP ingress exists.",
  )
}

export function createSecurityOperations(): SecurityOperations {
  return {
    review: async () => unavailable(),
    access: async () => unavailable(),
  }
}
