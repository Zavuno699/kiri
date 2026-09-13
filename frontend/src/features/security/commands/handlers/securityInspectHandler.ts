export interface SecurityInspectHandler {
  execute(id: string): Promise<unknown>
}

export function createSecurityInspectHandler(
  inspect: (id: string) => Promise<unknown>,
): SecurityInspectHandler {
  return {
    execute: inspect,
  }
}
