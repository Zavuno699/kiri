import type {
  DomainRuntimeDescriptor,
} from "../contracts/domainRuntimeDescriptor";

const descriptors = new Map<
  string,
  DomainRuntimeDescriptor
>();

export function registerDomainRuntimeDescriptor(
  descriptor: DomainRuntimeDescriptor,
): void {
  descriptors.set(
    descriptor.domain,
    descriptor,
  );
}

export function getDomainRuntimeDescriptor(
  domain: string,
): DomainRuntimeDescriptor | null {
  return (
    descriptors.get(domain) ??
    null
  );
}

export function listDomainRuntimeDescriptors(): DomainRuntimeDescriptor[] {
  return [
    ...descriptors.values(),
  ];
}
