
interface SessionExpiryBannerProps {
  visible: boolean;
  expiresAt?: string | null;
}

export function SessionExpiryBanner({
  visible,
  expiresAt,
}: SessionExpiryBannerProps) {
  if (!visible) {
    return null;
  }

  return (
    <div className="rounded-lg border border-amber-400/20 bg-amber-400/5 px-3 py-2 text-xs text-amber-200">
      Session is approaching expiry.
      {expiresAt ? ` Expires at ${expiresAt}.` : ""}
    </div>
  );
}

