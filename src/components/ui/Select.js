export default function Select({
  label,
  children,
  className = "",
  ...props
}) {
  return (
    <div className={className}>
      {label && (
        <label className="mb-1.5 block text-xs font-medium text-[var(--color-text-muted)]">
          {label}
        </label>
      )}

      <select
        {...props}
        className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] outline-none transition focus:border-[var(--color-primary)]"
      >
        {children}
      </select>
    </div>
  );
}