"use client";

import { X } from "lucide-react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

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
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-surface text-foreground shadow-xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {title}
            </h2>

            {modal.mode === "add" && (
              <p className="mt-1 text-sm text-muted">
                Se agregará dentro de {modal.parentName}.
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-foreground transition-colors hover:bg-surface-hover"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-5">
          <Input
            label={getInputLabel(modal.type)}
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
            autoFocus
          />
        </div>

        <div className="flex justify-end gap-2 border-t border-border px-5 py-4">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Cancelar
          </Button>

          <Button
            variant="primary"
            onClick={onSave}
          >
            {modal.mode === "add"
              ? "Guardar"
              : "Guardar cambios"}
          </Button>
        </div>
      </div>
    </div>
  );
}