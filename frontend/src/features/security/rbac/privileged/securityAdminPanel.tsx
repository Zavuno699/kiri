import { canAdministerSecurity } from "./securityAdminGate";

export function SecurityAdminPanel() {
  const allowed = canAdministerSecurity();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/30 p-4">
      <div className="text-sm font-semibold">
        Security administration
      </div>
      <div className="mt-2 text-xs text-slate-400">
        {allowed
          ? "Security administration authorized."
          : "Security administration restricted."}
      </div>
    </section>
  );
}
