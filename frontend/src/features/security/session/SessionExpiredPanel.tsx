
export function SessionExpiredPanel() {
  return (
    <section className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
      <div className="text-sm font-semibold">Session expired</div>
      <div className="mt-2 text-xs text-slate-400">
        Re-authentication is required before protected operations resume.
      </div>
    </section>
  );
}

