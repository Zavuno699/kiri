import {
  selectActionDescriptors,
} from "../../../application/commandQuery/selectors/selectActionDescriptors";

import {
  executeCommand,
} from "../../../application/commandQuery/runtime/executeCommand";

interface Props {
  domain: string;
  entityId?: string | null;
}

export function CommandList({
  domain,
  entityId = null,
}: Props) {
  const actions =
    selectActionDescriptors(
      domain,
      entityId,
    );

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold text-slate-200">
        Available commands
      </div>

      <div className="mt-3 space-y-2">
        {actions.map(
          (action) => (
            <button
              key={action.id}
              type="button"
              disabled={!action.enabled}
              onClick={() =>
                executeCommand({
                  commandId:
                    action.command.id,
                  entityId,
                  domain,
                  parameters:
                    {},
                  correlationId:
                    crypto.randomUUID(),
                  requestedAt:
                    new Date().toISOString(),
                })
              }
              className="w-full rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-left transition hover:border-blue-500/40 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <div className="text-xs font-medium text-slate-200">
                {action.command.label}
              </div>

              <div className="mt-1 text-[11px] text-slate-500">
                {action.command.description}
              </div>

              <div className="mt-2 text-[10px] uppercase tracking-wider text-slate-600">
                risk:{" "}
                {action.command.risk}
              </div>

              {action.blockedReason ? (
                <div className="mt-1 text-[10px] text-amber-500">
                  {action.blockedReason}
                </div>
              ) : null}
            </button>
          ),
        )}
      </div>
    </section>
  );
}
