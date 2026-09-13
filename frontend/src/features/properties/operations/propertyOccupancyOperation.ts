export function calculatePropertyOccupancy(
  totalUnits: number | undefined,
  availableUnits: number | undefined,
): number {
  if (
    totalUnits === undefined ||
    availableUnits === undefined ||
    totalUnits <= 0
  ) {
    return 0
  }

  return (
    (totalUnits - availableUnits) /
    totalUnits
  ) * 100
}
