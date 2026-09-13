interface RoleBadgeProps {
  role: string;
}

export function RoleBadge({ role }: RoleBadgeProps) {
  return (
    <span className="inline-flex rounded-md border border-slate-700/60 px-2 py-1 text-[11px] text-slate-400">
      {role}
    </span>
  );
}
