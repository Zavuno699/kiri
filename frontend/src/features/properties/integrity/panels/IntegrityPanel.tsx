interface IntegrityPanelProps {
  status: "pass" | "warn" | "fail" | "unknown";
  reason: string;
}

export function IntegrityPanel({
  status,
  reason,
}: IntegrityPanelProps) {
  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/30 p-4">
      <div className="text-sm font-semibold">
        Properties integrity
      </div>
      <div className="mt-2 text-xs text-slate-400">
        {status}
      </div>
      <div className="mt-1 text-[11px] text-slate-500">
        {reason}
      </div>
    </section>
  );
}
