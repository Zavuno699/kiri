import { leasesActionVisible } from "../visibility/actionVisibility";

export function canUseLeasesOperatorAction(): boolean {
  return leasesActionVisible();
}
