export default function Input({
  label,
  error,
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

      <input
        {...props}
        className={[
          "w-full rounded-lg border bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] outline-none transition",
          error
            ? "border-[var(--color-danger)]"
            : "border-[var(--color-border)] focus:border-[var(--color-primary)]",
        ].join(" ")}
      />

      {error && (
        <p className="mt-1 text-xs text-[var(--color-danger)]">
          {error}
        </p>
      )}
    </div>
  );
}