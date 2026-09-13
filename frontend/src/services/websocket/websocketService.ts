export interface WebSocketService {
  connect(url: string): WebSocket | null
}

export const websocketService:
  WebSocketService = {
    connect(url) {
      if (
        typeof WebSocket === "undefined"
      ) {
        return null
      }

      return new WebSocket(url)
    },
  }
