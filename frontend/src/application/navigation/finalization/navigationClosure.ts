import { finalRouteSurface } from "../../finalization/routes/finalRouteSurface";

export function navigationClosure() {
  return finalRouteSurface.filter(
    (route) => route.enabled,
  );
}
