export interface DomainPageDescriptor {
  domain: string;
  title: string;
  route: string;
  readCapability: string;
  writeCapability?: string;
  commandCapability?: string;
  operational: boolean;
}
