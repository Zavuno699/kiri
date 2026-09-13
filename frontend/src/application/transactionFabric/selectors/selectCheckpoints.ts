import {
  listCheckpoints,
} from "../checkpoints/checkpointStore";

export function selectCheckpoints(
  transactionId?: string,
) {
  return listCheckpoints(
    transactionId,
  );
}
