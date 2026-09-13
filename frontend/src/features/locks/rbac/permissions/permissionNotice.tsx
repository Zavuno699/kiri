interface PermissionNoticeProps {
  allowed: boolean;
  capability: string;
}

export function PermissionNotice({
  allowed,
  capability,
}: PermissionNoticeProps) {
  return (
    <div
      data-rbac={allowed ? "allowed" : "denied"}
      className="text-xs text-slate-500"
    >
      {allowed
        ? "Permission granted."
        : `Permission denied: ${capability}`}
    </div>
  );
}
