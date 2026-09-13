interface SectionHeaderProps {
  eyebrow: string
  title: string
  description?: string
}

export function SectionHeader({
  eyebrow,
  title,
  description,
}: SectionHeaderProps) {
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
