import type {
  Incident,
} from "../contracts/incident";

const incidents = new Map<
  string,
  Incident
>();

export function registerIncident(
  incident: Incident,
): void {
  incidents.set(
    incident.id,
    incident,
  );
}

export function getIncident(
  id: string,
): Incident | null {
  return (
    incidents.get(id) ??
    null
  );
}

export function updateIncident(
  id: string,
  patch: Partial<Incident>,
): void {
  const current =
    incidents.get(id);

  if (!current) {
    return;
  }

  incidents.set(
    id,
    {
      ...current,
      ...patch,
    },
  );
}

export function listIncidents(): Incident[] {
  return [
    ...incidents.values(),
  ];
}

export function removeIncident(
  id: string,
): void {
  incidents.delete(id);
}
