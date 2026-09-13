import {
  projectCommandResult,
} from "../../../projections/runtime/projectCommandResult";

export async function executeLeaseDeviceWorkflow(
  input: {
    leaseId: string;
    deviceId: string;
  },
): Promise<unknown> {
  return projectCommandResult(
    "devices",
    "devices",
    {
      type:
        "lease.device.authorize",
      payload: input,
    },
    "lease.device.authorize",
  );
}
