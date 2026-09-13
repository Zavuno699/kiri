
export interface StartSessionCommand {
  type: "security.session.start";
  sessionId: string;
}

export interface EndSessionCommand {
  type: "security.session.end";
  reason: string;
}

export interface RefreshSessionCommand {
  type: "security.session.refresh";
}

