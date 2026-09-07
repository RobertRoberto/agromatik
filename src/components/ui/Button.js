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
      "bg-primary text-white hover:opacity-90",

    secondary:
      "border border-border bg-surface text-foreground hover:bg-surface-hover",

    accent:
      "bg-accent text-white hover:opacity-90",

    outline:
      "border border-border bg-transparent text-foreground hover:bg-surface-hover",

    danger:
      "bg-danger text-white hover:opacity-90",

    outlineDanger:
      "border border-danger bg-transparent text-danger hover:bg-danger-soft",

    ghost:
      "bg-transparent text-foreground hover:bg-surface-hover",
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