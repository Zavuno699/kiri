import type { WorkflowDefinition } from "../../../application/workflows/workflowDefinition"

export interface DeviceCommandContext {
  deviceId: string
  command: string
  accepted: boolean
}

export const deviceCommandWorkflow:
  WorkflowDefinition<DeviceCommandContext> = {
    id: "device.command",
    steps: [
      {
        id: "validate",
        async execute(context) {
          return {
            ...context,
            accepted:
              context.deviceId.length > 0 &&
              context.command.length > 0,
          }
        },
      },
    ],
  }
