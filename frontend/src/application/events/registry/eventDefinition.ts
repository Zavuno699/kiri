import type { EventVersionRange } from "../versioning/eventVersionRange";

export type EventDefinition = {
  eventType: string;
  versions: EventVersionRange;
  replayable: boolean;
  projected: boolean;
  securityRelevant: boolean;
};
