
interface RestrictedOperationNoticeProps {
  reason: string;
}

export function RestrictedOperationNotice({
  reason,
}: RestrictedOperationNoticeProps) {
  return (
    <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-xs text-red-200">
      Operation restricted: {reason}
    </div>
  );
}

