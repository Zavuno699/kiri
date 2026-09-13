export interface ApiResourceDefinition {
  key: string;
  domain: string;
  collectionPath: string;
  detailPath?: (id: string) => string;
  readCapability: string;
  writeCapability?: string;
  commandCapability?: string;
  backendVerified?: boolean;
}
