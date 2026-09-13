interface RuntimePolicyPanelProps {
  readable: boolean;
  writable: boolean;
  commandable: boolean;
  reason?: string | null;
}

export function RuntimePolicyPanel({
  readable,
  writable,
  commandable,
  reason,
}: RuntimePolicyPanelProps) {
  return (
    <section className="rounded-lg border border-slate-700/50 bg-slate-950/30 p-3">
      <div className="text-xs font-semibold">Locks runtime policy</div>
      <div className="mt-2 grid gap-1 text-[11px] text-slate-400">
        <div>Read: {String(readable)}</div>
        <div>Write: {String(writable)}</div>
        <div>Command: {String(commandable)}</div>
        {reason ? <div>Reason: {reason}</div> : null}
      </div>
    </section>
  );
}
