export interface InfrastructureRuntimeState {
  initialized: boolean
  environment: string
}

export const infrastructureRuntime:
  InfrastructureRuntimeState = {
    initialized: true,
    environment:
      import.meta.env.MODE ?? "development",
  }
