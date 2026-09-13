export function PanelHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-kiri-blue-400">
        {eyebrow}
      </div>

      <h3 className="mt-2 text-lg font-black text-kiri-text">
        {title}
      </h3>

      {description ? (
        <p className="mt-2 text-xs leading-5 text-kiri-text-muted">
          {description}
        </p>
      ) : null}
    </div>
  )
}
