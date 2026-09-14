import {
  getSecurityRuntimeState,
} from "../../../../application/security/runtime/securityRuntimeStore"

export function SecurityOperatorSummary() {
  const state = getSecurityRuntimeState()

  return (
    <div>
      <div>
        Principal: {state.identity.principal ?? "none"}
      </div>
      <div>
        Authenticated:{" "}
        {String(state.identity.authenticated)}
      </div>
      <div>
        Session:{" "}
        {String(Boolean(state.session.session))}
      </div>
      <div>
        Authorization:{" "}
        {String(state.authorizationReady)}
      </div>
      <div>
        Frozen: {String(state.frozen)}
      </div>
    </div>
  )
}
