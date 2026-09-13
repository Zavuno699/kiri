export type DomainProjectionReplayPolicy = {
  domain: string;
  checkpointEvery: number;
  staleAfterMs: number;
  rebuildAllowed: boolean;
  resumeAllowed: boolean;
  strictVerification: boolean;
};
