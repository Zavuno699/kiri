interface PaginationBarProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function PaginationBar({
  page,
  totalPages,
  onPageChange,
}: PaginationBarProps) {
  const canPrevious = page > 1
  const canNext = page < totalPages

  return (
    <div className="flex items-center justify-between gap-3 border-t border-white/7 pt-4">
      <div className="text-[10px] text-kiri-text-muted">
        Page {page} of {totalPages}
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          disabled={!canPrevious}
          onClick={() => onPageChange(page - 1)}
          className="rounded-lg border border-white/8 px-3 py-2 text-[10px] font-bold text-kiri-text-soft disabled:opacity-40"
        >
          Previous
        </button>

        <button
          type="button"
          disabled={!canNext}
          onClick={() => onPageChange(page + 1)}
          className="rounded-lg border border-white/8 px-3 py-2 text-[10px] font-bold text-kiri-text-soft disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  )
}
