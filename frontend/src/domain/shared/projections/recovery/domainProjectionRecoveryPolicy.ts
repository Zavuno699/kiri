export type DomainProjectionRecoveryPolicy = {
  domain: string;
  maxReplayAttempts: number;
  rewindOnDivergence: boolean;
  rebuildOnMissingCheckpoint: boolean;
};
