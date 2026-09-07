export default function Select({
  label,
  children,
  className = "",
  ...props
}) {
  return (
    <div className={className}>
      {label && (
        <label className="mb-1.5 block text-xs font-medium text-muted">
          {label}
        </label>
      )}

      <select
        {...props}
        className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none transition focus:border-primary"
      >
        {children}
      </select>
    </div>
  );
}