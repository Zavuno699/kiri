import {
  buildReplayDescriptor,
} from "./buildReplayDescriptor";

export function requestEventReplay(
  eventId: string,
) {
  const descriptor =
    buildReplayDescriptor(
      eventId,
    );

  if (
    !descriptor.replayable
  ) {
    return {
      accepted:
        false,
      message:
        descriptor.blockedReason ??
        "Replay blocked",
    };
  }

  return {
    accepted:
      true,
    message:
      "Replay request prepared for backend authorization",
  };
}
