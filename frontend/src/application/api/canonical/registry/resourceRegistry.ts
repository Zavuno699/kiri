import type {
  ApiResourceContract,
} from "../contracts/apiResource";

const resources = new Map<
  string,
  ApiResourceContract
>();

export function registerApiResource(
  resource: ApiResourceContract,
): void {
  resources.set(
    resource.key,
    resource,
  );
}

export function getApiResource(
  key: string,
): ApiResourceContract | null {
  return resources.get(key) ?? null;
}

export function listApiResources(): ApiResourceContract[] {
  return [...resources.values()];
}
