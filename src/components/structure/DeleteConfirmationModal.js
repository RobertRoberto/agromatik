"use client";

import { AlertTriangle } from "lucide-react";

export default function DeleteConfirmationModal({
  node,
  onCancel,
  onConfirm,
}) {
  if (!node) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl border border-[var(--agromatik-border)] bg-[var(--agromatik-card)] shadow-xl">
        <div className="p-6">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-red-100 text-red-600">
            <AlertTriangle size={22} />
          </div>

          <h2 className="text-lg font-semibold">
            Eliminar elemento
          </h2>

          <p className="mt-2 text-sm text-[var(--agromatik-text-secondary)]">
            ¿Seguro que deseas eliminar{" "}
            <span className="font-semibold">
              {node.name}
            </span>
            ?
          </p>

          <p className="mt-2 text-sm text-red-600">
            Si contiene elementos dependientes, también
            serán eliminados.
          </p>
        </div>

        <div className="flex justify-end gap-2 border-t border-[var(--agromatik-border)] px-5 py-4">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-[var(--agromatik-border)] px-4 py-2 text-sm font-medium transition hover:bg-[var(--agromatik-green-light)]"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}