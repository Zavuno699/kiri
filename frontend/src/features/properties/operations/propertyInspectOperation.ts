export interface PropertyInspectOperation {
  execute(id: string): Promise<unknown>
}

export function createPropertyInspectOperation(
  inspect: (id: string) => Promise<unknown>,
): PropertyInspectOperation {
  return {
    execute: inspect,
  }
}
