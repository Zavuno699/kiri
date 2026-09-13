interface ReconciliationPanelProps {
  status: string;
  conflicts?: string[];
}

export function ReconciliationPanel({
  status,
  conflicts = [],
}: ReconciliationPanelProps) {
  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/30 p-4">
      <div className="text-sm font-semibold">
        Properties reconciliation
      </div>
      <div className="mt-2 text-xs text-slate-400">
        Status: {status}
      </div>
      {conflicts.length > 0 ? (
        <div className="mt-2 text-[11px] text-amber-200">
          Conflicts: {conflicts.join(", ")}
        </div>
      ) : null}
    </section>
  );
}
