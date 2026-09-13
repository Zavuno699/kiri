interface RecoveryPanelProps {
  status: string;
  reason?: string | null;
}

export function RecoveryPanel({
  status,
  reason,
}: RecoveryPanelProps) {
  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/30 p-4">
      <div className="text-sm font-semibold">
        Security recovery
      </div>
      <div className="mt-2 text-xs text-slate-400">
        Status: {status}
      </div>
      {reason ? (
        <div className="mt-1 text-[11px] text-slate-500">
          {reason}
        </div>
      ) : null}
    </section>
  );
}
