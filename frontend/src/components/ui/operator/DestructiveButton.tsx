import type { ButtonHTMLAttributes } from "react"

export function DestructiveButton(
  props: ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return (
    <button
      {...props}
      className={[
        "rounded-xl border border-kiri-red/20 bg-kiri-red/[0.06] px-4 py-3 text-xs font-bold text-kiri-red transition hover:bg-kiri-red/[0.10] disabled:cursor-not-allowed disabled:opacity-40",
        props.className ?? "",
      ].join(" ")}
    />
  )
}
