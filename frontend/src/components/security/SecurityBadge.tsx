
import type { ReactNode } from "react";

interface SecurityBadgeProps {
  allowed: boolean;
  children: ReactNode;
}

export function SecurityBadge({
  allowed,
  children,
}: SecurityBadgeProps) {
  return (
    <span
      data-security-state={allowed ? "allowed" : "denied"}
      className="inline-flex items-center rounded-md border px-2 py-1 text-xs"
    >
      {children}
    </span>
  );
}

