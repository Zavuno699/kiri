import type {
  EventEnvelope,
} from "./eventEnvelope";

export interface EventRecord<T = unknown> {
  sequence: number;
  envelope: EventEnvelope<T>;
  acknowledged: boolean;
  projected: boolean;
}
