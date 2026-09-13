export type ApplicationFacade = {
  name: string;
  enabled: boolean;
};

export const applicationFacades: ApplicationFacade[] = [];

export function registerApplicationFacade(
  facade: ApplicationFacade,
): void {
  applicationFacades.push(facade);
}
