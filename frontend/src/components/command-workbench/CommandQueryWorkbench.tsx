import {
  CommandWorkbenchHeader,
} from "./header/CommandWorkbenchHeader";

import {
  CrossDomainActionSurface,
} from "./actions/CrossDomainActionSurface";

import {
  CommandHistory,
} from "./history/CommandHistory";

import {
  CommandWorkbenchStatus,
} from "./status/CommandWorkbenchStatus";

interface Props {
  domain?: string;
  entityId?: string | null;
}

export function CommandQueryWorkbench({
  domain = "locks",
  entityId = null,
}: Props) {
  return (
    <section className="space-y-4">
      <CommandWorkbenchHeader />

      <CrossDomainActionSurface
        domain={domain}
        entityId={entityId}
      />

      <CommandHistory />

      <CommandWorkbenchStatus />
    </section>
  );
}
