"use client";

import { X } from "lucide-react";

function getInputLabel(type) {
  switch (type) {
    case "rancho":
      return "Nombre del rancho";

    case "llave":
      return "Código de la llave";

    case "tunel":
      return "Código del túnel";

    case "surco":
      return "Código del surco";

    case "polin":
      return "Código del polín";

    case "plantas":
      return "Cantidad de plantas";

    default:
      return "Valor";
  }
}

function getPlaceholder(type) {
  switch (type) {
    case "rancho":
      return "Ej. Rancho Tres Hermanos";

    case "llave":
      return "Ej. L-04";

    case "tunel":
      return "Ej. T-08";

    case "surco":
      return "Ej. S-05";

    case "polin":
      return "Ej. P-10";

    case "plantas":
      return "Ej. 12";

    default:
      return "";
  }
}

function getAddTitle(type) {
  switch (type) {
    case "llave":
      return "Agregar llave";

    case "tunel":
      return "Agregar túnel";

    case "surco":
      return "Agregar surco";

    case "polin":
      return "Agregar polín";

    case "plantas":
      return "Registrar plantas";

    default:
      return "Agregar";
  }
}

export default function StructureFormModal({
  modal,
  value,
  setValue,
  onClose,
  onSave,
}) {
  if (!modal) return null;

  const title =
    modal.mode === "add"
      ? getAddTitle(modal.type)
      : `Editar ${modal.nodeName}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl border border-[var(--agromatik-border)] bg-[var(--agromatik-card)] shadow-xl">
        <div className="flex items-center justify-between border-b border-[var(--agromatik-border)] px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold">
              {title}
            </h2>

            {modal.mode === "add" && (
              <p className="mt-1 text-sm text-[var(--agromatik-text-secondary)]">
                Se agregará dentro de {modal.parentName}.
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-[var(--agromatik-green-light)]"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-5">
          <label className="mb-2 block text-sm font-medium">
            {getInputLabel(modal.type)}
          </label>

          <input
            type={
              modal.type === "plantas"
                ? "number"
                : "text"
            }
            value={value}
            onChange={(event) =>
              setValue(event.target.value)
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                onSave();
              }
            }}
            placeholder={getPlaceholder(modal.type)}
            min={
              modal.type === "plantas"
                ? 1
                : undefined
            }
            className="w-full rounded-lg border border-[var(--agromatik-border)] bg-[var(--agromatik-card)] px-3 py-2.5 outline-none transition focus:border-[var(--agromatik-green)]"
            autoFocus
          />
        </div>

        <div className="flex justify-end gap-2 border-t border-[var(--agromatik-border)] px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[var(--agromatik-border)] px-4 py-2 text-sm font-medium transition hover:bg-[var(--agromatik-green-light)]"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={onSave}
            className="rounded-lg bg-[var(--agromatik-green)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            {modal.mode === "add"
              ? "Guardar"
              : "Guardar cambios"}
          </button>
        </div>
      </div>
    </div>
  );
}