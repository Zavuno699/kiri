export interface PropertyInspectHandler {
  execute(id: string): Promise<unknown>
}

export function createPropertyInspectHandler(
  inspect: (id: string) => Promise<unknown>,
): PropertyInspectHandler {
  return {
    execute: inspect,
  }
}
