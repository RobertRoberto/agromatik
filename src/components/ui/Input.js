export default function Input({
  label,
  error,
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

      <input
        {...props}
        className={[
          "w-full rounded-lg border bg-surface px-3 py-2 text-sm text-foreground outline-none transition",
          "placeholder:text-muted",
          error
            ? "border-danger focus:border-danger"
            : "border-border focus:border-primary",
        ].join(" ")}
      />

      {error && (
        <p className="mt-1 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}