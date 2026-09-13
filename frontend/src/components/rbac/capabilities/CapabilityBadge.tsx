interface CapabilityBadgeProps {
  capability: string;
  allowed: boolean;
}

export function CapabilityBadge({
  capability,
  allowed,
}: CapabilityBadgeProps) {
  return (
    <span
      data-capability={capability}
      data-allowed={allowed ? "true" : "false"}
      className="inline-flex rounded-md border border-slate-700/60 px-2 py-1 text-[11px] text-slate-400"
    >
      {capability}
    </span>
  );
}
