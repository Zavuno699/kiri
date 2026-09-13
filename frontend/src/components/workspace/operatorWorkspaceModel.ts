export interface OperatorWorkspaceModel {
  title: string
  domain: string
  entityId?: string
  status?: string
  degraded: boolean
  sections: string[]
  actions: string[]
}

export function createOperatorWorkspaceModel(
  input: Omit<OperatorWorkspaceModel, "degraded"> & {
    degraded?: boolean
  },
): OperatorWorkspaceModel {
  return {
    ...input,
    degraded: input.degraded ?? false,
  }
}
