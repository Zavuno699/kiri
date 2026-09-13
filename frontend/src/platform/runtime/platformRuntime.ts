export interface PlatformRuntimeState {
  browser: boolean
  online: boolean
}

export function getPlatformRuntime(): PlatformRuntimeState {
  return {
    browser:
      typeof window !== "undefined",
    online:
      typeof navigator !== "undefined"
        ? navigator.onLine
        : true,
  }
}
