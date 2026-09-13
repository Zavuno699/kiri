interface CommandAuthorizationBadgeProps {
  allowed: boolean;
  confirmationRequired: boolean;
}

export function CommandAuthorizationBadge({
  allowed,
  confirmationRequired,
}: CommandAuthorizationBadgeProps) {
  return (
    <span className="inline-flex rounded-md border border-slate-700/50 px-2 py-1 text-[11px] text-slate-400">
      {allowed
        ? confirmationRequired
          ? "authorized · confirmation required"
          : "authorized"
        : "restricted"}
    </span>
  );
}
