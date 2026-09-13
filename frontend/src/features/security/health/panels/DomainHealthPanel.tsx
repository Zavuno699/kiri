interface DomainHealthPanelProps {
  status: string;
  score: number;
}

export function DomainHealthPanel({
  status,
  score,
}: DomainHealthPanelProps) {
  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/30 p-4">
      <div className="text-sm font-semibold">
        Security health
      </div>
      <div className="mt-2 text-xs text-slate-400">
        Status: {status}
      </div>
      <div className="mt-1 text-[11px] text-slate-500">
        Score: {score}
      </div>
    </section>
  );
}
