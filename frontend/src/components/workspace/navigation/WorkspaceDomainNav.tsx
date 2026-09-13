import {
  listWorkspaceDomains,
} from "../../application/workspace/registry/workspaceDomainRegistry";

export function WorkspaceDomainNav() {
  return (
    <nav className="flex flex-wrap gap-2">
      {listWorkspaceDomains().map(
        (domain) => (
          <div
            key={domain.key}
            className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-xs text-slate-300"
          >
            {domain.label}
          </div>
        ),
      )}
    </nav>
  );
}
