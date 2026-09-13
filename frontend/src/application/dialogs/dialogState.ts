export interface DialogState {
  open: boolean
  title?: string
  description?: string
  intent?: "info" | "warning" | "danger"
}

export const closedDialog: DialogState = {
  open: false,
}
