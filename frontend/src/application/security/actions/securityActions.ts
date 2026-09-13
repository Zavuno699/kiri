
export const securityActions = {
  authenticate: "security.authenticate",
  signOut: "security.signOut",
  refreshSession: "security.refreshSession",
  revokeSession: "security.revokeSession",
  evaluateAccess: "security.evaluateAccess",
  reviewAudit: "security.reviewAudit",
  freeze: "security.freeze",
  unfreeze: "security.unfreeze",
} as const;

