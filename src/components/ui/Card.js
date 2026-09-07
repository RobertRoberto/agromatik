export default function Card({
  children,
  className = "",
  padding = true,
}) {
  return (
    <div
      className={[
        "rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]",
        padding ? "p-5" : "",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}