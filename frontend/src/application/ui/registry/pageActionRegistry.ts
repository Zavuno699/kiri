import type {
  PageAction,
} from "../contracts/pageAction";

const actions = new Map<
  string,
  PageAction[]
>();

export function registerPageActions(
  domain: string,
  domainActions: PageAction[],
): void {
  actions.set(
    domain,
    domainActions,
  );
}

export function getPageActions(
  domain: string,
): PageAction[] {
  return actions.get(domain) ?? [];
}

export function listPageActionDomains(): string[] {
  return [
    ...actions.keys(),
  ];
}
