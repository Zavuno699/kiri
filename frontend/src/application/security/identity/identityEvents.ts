
export interface IdentityEstablishedEvent {
  type: "security.identity.established";
  occurredAt: string;
  principal: string;
}

export interface IdentityClearedEvent {
  type: "security.identity.cleared";
  occurredAt: string;
  reason: string;
}

