import type {
  OperatorNotification,
} from "../../infrastructure/notifications/notificationTypes"

export function NotificationItem({
  notification,
  onDismiss,
}: {
  notification: OperatorNotification
  onDismiss: (id: string) => void
}) {
  const tone = {
    info: "border-kiri-blue-500/20",
    success: "border-kiri-green/20",
    warning: "border-kiri-amber/20",
    error: "border-kiri-red/20",
  }[notification.severity]

  return (
    <article
      className={[
        "rounded-xl border bg-kiri-900/90 p-4",
        tone,
      ].join(" ")}
    >
      <div className="flex justify-between gap-3">
        <div>
          <div className="text-sm font-bold text-kiri-text">
            {notification.title}
          </div>

          <div className="mt-1 text-xs leading-5 text-kiri-text-muted">
            {notification.message}
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            onDismiss(notification.id)
          }
          className="text-[10px] text-kiri-text-muted hover:text-kiri-text"
        >
          Dismiss
        </button>
      </div>
    </article>
  )
}
