import { CapabilityMatrixPanel } from "../../components/rbac/matrix/CapabilityMatrixPanel";
import { RoleBadge } from "../../components/rbac/roles/RoleBadge";
import { listRBACRoles } from "../../application/rbac/roles/roleRegistry";

export function RBACControlPage() {
  const roles = listRBACRoles();

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-4">
        <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
          <div className="text-sm font-semibold">
            Operator roles
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {roles.map((role) => (
              <RoleBadge
                key={role.key}
                role={role.name}
              />
            ))}
          </div>
        </section>

        <CapabilityMatrixPanel />
      </div>
    </main>
  );
}
