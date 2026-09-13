import { locksCommandAuthorized } from "../commands/domainCommandAuthorization";

export function CommandAuthorizationPanel() {
  const allowed = locksCommandAuthorized();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/30 p-3">
      <div className="text-xs font-semibold">
        Locks command authorization
      </div>
      <div className="mt-2 text-[11px] text-slate-500">
        {allowed ? "Authorized" : "Restricted"}
      </div>
    </section>
  );
}
