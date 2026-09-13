export type DomainFinalizationContract = {
  domain: string;
  ui: boolean;
  api: boolean;
  state: boolean;
  commands: boolean;
  queries: boolean;
  events: boolean;
  projections: boolean;
  security: boolean;
};
