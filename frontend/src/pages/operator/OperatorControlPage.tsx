import { RoleAwareNavigation } from "../../components/operator/navigation/RoleAwareNavigation";
import { RoleAwareActionList } from "../../components/operator/actions/RoleAwareActionList";
import { RoleCapabilitySummary } from "../../components/operator/rbac/RoleCapabilitySummary";

export function OperatorControlPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-4">
        <RoleCapabilitySummary />

        <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
          <div className="text-sm font-semibold">
            Authorized navigation
          </div>
          <div className="mt-3">
            <RoleAwareNavigation />
          </div>
        </section>

        <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
          <div className="text-sm font-semibold">
            Available operator actions
          </div>
          <div className="mt-3">
            <RoleAwareActionList />
          </div>
        </section>
      </div>
    </main>
  );
}
