export interface ApplicationProvider {
  id: "application"
  ready: boolean
}

export const applicationProvider: ApplicationProvider = {
  id: "application",
  ready: false,
}
