import type {
  DomainPageDescriptor,
} from "../contracts/domainPageDescriptor";

const pages = new Map<
  string,
  DomainPageDescriptor
>();

export function registerDomainPage(
  page: DomainPageDescriptor,
): void {
  pages.set(
    page.domain,
    page,
  );
}

export function getDomainPage(
  domain: string,
): DomainPageDescriptor | null {
  return (
    pages.get(domain) ??
    null
  );
}

export function listDomainPages(): DomainPageDescriptor[] {
  return [
    ...pages.values(),
  ];
}
