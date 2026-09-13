interface AccessDecisionBadgeProps {
  allowed: boolean;
  reason: string;
}

export function AccessDecisionBadge({
  allowed,
  reason,
}: AccessDecisionBadgeProps) {
  return (
    <span className="inline-flex rounded-md border border-slate-700/60 px-2 py-1 text-[11px] text-slate-400">
      {allowed ? "allowed" : `denied: ${reason}`}
    </span>
  );
}
