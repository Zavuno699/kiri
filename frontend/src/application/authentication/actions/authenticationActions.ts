export type AuthenticationAction =
  | {
      type: "authenticate"
      principalId: string
      sessionId: string
    }
  | {
      type: "logout"
    }
  | {
      type: "expire"
    }
