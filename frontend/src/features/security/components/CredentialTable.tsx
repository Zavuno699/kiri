import type { SecurityCredential } from "../types/security"
import { CredentialStatusPill } from "./SecurityStatus"

interface CredentialTableProps {
  credentials: SecurityCredential[]
}

export function CredentialTable({
  credentials,
}: CredentialTableProps) {
  if (credentials.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/10 px-5 py-10 text-center">
        <div className="text-sm font-semibold text-kiri-text-soft">
          No credential records available
        </div>

        <div className="mt-1 text-xs text-kiri-text-muted">
          Credential data will appear when the security API is connected.
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/7">
      <table className="w-full min-w-[950px] border-collapse text-left">
        <thead className="bg-kiri-900">
          <tr className="border-b border-white/7">
            {[
              "Credential",
              "Subject",
              "Lease",
              "Type",
              "Status",
              "Issued",
              "Expires",
            ].map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-kiri-text-muted"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {credentials.map((credential) => (
            <tr
              key={credential.id}
              className="border-b border-white/5 last:border-b-0"
            >
              <td className="px-4 py-4">
                <div className="font-mono text-xs text-kiri-blue-400">
                  {credential.id}
                </div>
              </td>

              <td className="px-4 py-4 text-xs text-kiri-text-soft">
                {credential.subjectId}
              </td>

              <td className="px-4 py-4 text-xs text-kiri-text-muted">
                {credential.leaseId ?? "—"}
              </td>

              <td className="px-4 py-4 text-xs text-kiri-text-soft">
                {credential.credentialType}
              </td>

              <td className="px-4 py-4">
                <CredentialStatusPill
                  status={credential.status}
                />
              </td>

              <td className="px-4 py-4 text-xs text-kiri-text-muted">
                {credential.issuedAt
                  ? new Date(credential.issuedAt).toLocaleString("en-UG")
                  : "—"}
              </td>

              <td className="px-4 py-4 text-xs text-kiri-text-muted">
                {credential.expiresAt
                  ? new Date(credential.expiresAt).toLocaleString("en-UG")
                  : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
