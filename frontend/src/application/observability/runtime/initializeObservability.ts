import {
  checkComponentHealth,
} from "./checkComponentHealth";

let initialized =
  false;

export function initializeObservability(): void {
  if (initialized) {
    return;
  }

  initialized =
    true;

  checkComponentHealth({
    component:
      "command-query-control-plane",
    domain:
      "global",
    status:
      "healthy",
    message:
      "Command/query control plane initialized.",
  });

  checkComponentHealth({
    component:
      "event-stream",
    domain:
      "global",
    status:
      "healthy",
    message:
      "Event stream workbench initialized.",
  });

  checkComponentHealth({
    component:
      "data-fabric",
    domain:
      "global",
    status:
      "healthy",
    message:
      "Global data fabric initialized.",
  });
}
