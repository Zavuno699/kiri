import type {
  NavigationItem,
} from "../contracts/navigationItem";

let selectedRoute =
  "/";

let items:
  NavigationItem[] = [];

export function getSelectedRoute(): string {
  return selectedRoute;
}

export function setSelectedRoute(
  route: string,
): void {
  selectedRoute =
    route;
}

export function setNavigationItems(
  next: NavigationItem[],
): void {
  items = [
    ...next,
  ];
}

export function getNavigationItems(): NavigationItem[] {
  return [
    ...items,
  ];
}
