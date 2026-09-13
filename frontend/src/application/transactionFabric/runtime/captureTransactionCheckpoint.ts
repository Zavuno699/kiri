import {
  createCheckpoint,
} from "../checkpoints/checkpointStore";

export function captureTransactionCheckpoint(
  transactionId: string,
  stepId: string,
  sequence: number,
  state: Record<
    string,
    unknown
  >,
): string {
  const id =
    `checkpoint-${transactionId}-${stepId}-${sequence}`;

  createCheckpoint({
    id,
    transactionId,
    stepId,
    sequence,
    status:
      "prepared",
    stateHash:
      JSON.stringify(
        state,
      ),
    capturedAt:
      new Date().toISOString(),
    metadata:
      {},
  });

  return id;
}
