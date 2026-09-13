export function normalizeRoute(
  route: string,
): string {
  if (route === "") {
    return "/";
  }

  if (
    route.length > 1 &&
    route.endsWith("/")
  ) {
    return route.slice(
      0,
      -1,
    );
  }

  return route;
}
