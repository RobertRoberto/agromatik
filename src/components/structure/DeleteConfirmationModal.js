"use client";

import { AlertTriangle } from "lucide-react";

import Button from "@/components/ui/Button";

export default function DeleteConfirmationModal({
  node,
  onCancel,
  onConfirm,
}) {
  if (!node) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-surface text-foreground shadow-xl">
        <div className="p-6">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-danger-soft text-danger">
            <AlertTriangle size={22} />
          </div>

          <h2 className="text-lg font-semibold text-foreground">
            Eliminar elemento
          </h2>

          <p className="mt-2 text-sm text-muted">
            ¿Seguro que deseas eliminar{" "}
            <span className="font-semibold text-foreground">
              {node.name}
            </span>
            ?
          </p>

          <p className="mt-2 text-sm text-danger">
            Si contiene elementos dependientes, también serán eliminados.
          </p>
        </div>

        <div className="flex justify-end gap-2 border-t border-border px-5 py-4">
          <Button
            variant="secondary"
            onClick={onCancel}
          >
            Cancelar
          </Button>

          <Button
            variant="danger"
            onClick={onConfirm}
          >
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  );
}