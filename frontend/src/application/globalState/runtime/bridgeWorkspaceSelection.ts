import {
  applyGlobalAction,
} from "../reducers/applyGlobalAction";

export function bridgeWorkspaceSelection(
  domain: string,
  resourceId: string | null,
): void {
  applyGlobalAction({
    type:
      "workspace.domain.selected",
    domain,
    source:
      "ui",
  });

  if (resourceId !== null) {
    applyGlobalAction({
      type:
        "workspace.resource.selected",
      payload:
        resourceId,
      source:
        "ui",
    });
  }
}
