import {
  selectCommandsForEntity,
} from "./selectCommandsForEntity";

import {
  buildActionDescriptor,
} from "../authorization/buildActionDescriptor";

export function selectActionDescriptors(
  domain: string,
  entityId: string | null,
) {
  const commands =
    selectCommandsForEntity(
      domain,
    );

  return commands.map(
    (command) =>
      buildActionDescriptor(
        command.id,
        entityId,
        {
          authenticated:
            true,
          allowedDomains:
            [
              domain,
              "global",
            ],
          capabilities:
            [command.id],
          confirmed:
            true,
        },
      ),
  );
}
