interface WorkflowStatusPanelProps {
  running: boolean;
  blocked: boolean;
  failed: boolean;
}

export function WorkflowStatusPanel({
  running,
  blocked,
  failed,
}: WorkflowStatusPanelProps) {
  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/30 p-4">
      <div className="text-sm font-semibold">
        Locks workflow
      </div>
      <div className="mt-2 grid gap-1 text-xs text-slate-400">
        <div>Running: {String(running)}</div>
        <div>Blocked: {String(blocked)}</div>
        <div>Failed: {String(failed)}</div>
      </div>
    </section>
  );
}
