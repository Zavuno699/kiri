export function jsonHeaders(
  correlationId?: string,
): Record<string, string> {
  return {
    ...standardHeaders(correlationId),
    "Content-Type": "application/json",
  }
}

import {
  standardHeaders,
} from "./standardHeaders"
