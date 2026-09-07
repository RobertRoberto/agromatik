export default function Button({
  children,
  variant = "primary",
  type = "button",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60";

  const variants = {
    primary:
      "bg-[var(--color-primary)] text-white hover:opacity-90",

    secondary:
      "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-primary-soft)]",

    accent:
      "bg-[var(--color-accent)] text-white hover:opacity-90",

    danger:
      "bg-[var(--color-danger)] text-white hover:opacity-90",

    ghost:
      "bg-transparent text-[var(--color-text)] hover:bg-[var(--color-primary-soft)]",
  };

  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}