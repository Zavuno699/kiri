export interface RebuildDescriptor {
  projectionId: string;
  domain: string;
  rebuildable: boolean;
  currentVersion: number;
  targetVersion: number;
  estimatedScope: string;
  requiresAuthorization: boolean;
  requiresConfirmation: boolean;
  blockedReason: string | null;
}
