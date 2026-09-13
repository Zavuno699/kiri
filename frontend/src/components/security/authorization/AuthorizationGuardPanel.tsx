interface AuthorizationGuardPanelProps {
  capability: string;
  allowed: boolean;
  reason?: string;
}

export function AuthorizationGuardPanel({
  capability,
  allowed,
  reason,
}: AuthorizationGuardPanelProps) {
  return (
    <section
      data-authorization={allowed ? "allowed" : "denied"}
      className="rounded-lg border border-slate-700/50 bg-slate-950/30 p-3"
    >
      <div className="text-xs font-semibold">Authorization guard</div>
      <div className="mt-1 text-[11px] text-slate-400">
        {capability}
      </div>
      <div className="mt-2 text-[11px] text-slate-500">
        {allowed ? "Allowed" : reason ?? "Denied"}
      </div>
    </section>
  );
}
