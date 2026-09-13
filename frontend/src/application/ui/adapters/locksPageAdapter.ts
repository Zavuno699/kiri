import {
  createLocksViewModel,
} from "../../../features/locks/ui/runtime/createLocksViewModel";

export function getLocksOperationalView() {
  return createLocksViewModel();
}
