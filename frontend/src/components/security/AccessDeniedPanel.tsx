
interface AccessDeniedPanelProps {
  capability?: string;
  reason?: string;
}

export function AccessDeniedPanel({
  capability,
  reason = "Access denied",
}: AccessDeniedPanelProps) {
  return (
    <section className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
      <div className="text-sm font-semibold">Restricted operation</div>
      <div className="mt-1 text-xs text-slate-400">{reason}</div>
      {capability ? (
        <div className="mt-2 text-[11px] text-slate-500">
          Capability: {capability}
        </div>
      ) : null}
    </section>
  );
}

