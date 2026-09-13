import {
  CommandList,
} from "../commands/CommandList";

import {
  QueryList,
} from "../queries/QueryList";

interface Props {
  domain: string;
  entityId?: string | null;
}

export function CrossDomainActionSurface({
  domain,
  entityId = null,
}: Props) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <CommandList
        domain={domain}
        entityId={entityId}
      />

      <QueryList
        domain={domain}
        entityId={entityId}
      />
    </div>
  );
}
