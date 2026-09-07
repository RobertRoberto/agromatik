export default function Card({
  children,
  className = "",
  padding = true,
}) {
  return (
    <div
      className={[
        "rounded-2xl border border-border bg-surface",
        padding ? "p-5" : "",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}