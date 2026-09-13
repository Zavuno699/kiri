import type { ButtonHTMLAttributes } from "react"

export function SecondaryButton(
  props: ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return (
    <button
      {...props}
      className={[
        "rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3 text-xs font-bold text-kiri-text-soft transition hover:bg-white/[0.04] disabled:cursor-not-allowed disabled:opacity-40",
        props.className ?? "",
      ].join(" ")}
    />
  )
}
