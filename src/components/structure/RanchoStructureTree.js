"use client";

import { useState } from "react";

import {
  ChevronDown,
  ChevronRight,
  House,
  Droplets,
  Warehouse,
  Rows3,
  Fence,
  Leaf,
  MoreHorizontal,
  Plus,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

const initialStructureData = [
  {
    id: "rancho-1",
    type: "rancho",
    name: "Rancho Tres Hermanos",
    children: [
      {
        id: "llave-l03",
        type: "llave",
        name: "Llave L-03",
        children: [
          {
            id: "tunel-t07",
            type: "tunel",
            name: "Túnel T-07",
            children: [
              {
                id: "surco-s04",
                type: "surco",
                name: "Surco S-04",
                children: [
                  {
                    id: "polin-p09",
                    type: "polin",
                    name: "Polín P-09",
                    children: [
                      {
                        id: "plantas-p09",
                        type: "plantas",
                        name: "12 plantas",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

function getIcon(type) {
  switch (type) {
    case "rancho":
      return <House size={18} />;

    case "llave":
      return <Droplets size={18} />;

    case "tunel":
      return <Warehouse size={18} />;

    case "surco":
      return <Rows3 size={18} />;

    case "polin":
      return <Fence size={18} />;

    case "plantas":
      return <Leaf size={18} />;

    default:
      return null;
  }
}

function getChildType(type) {
  switch (type) {
    case "rancho":
      return "llave";

    case "llave":
      return "tunel";

    case "tunel":
      return "surco";

    case "surco":
      return "polin";

    case "polin":
      return "plantas";

    default:
      return null;
  }
}

function getAddLabel(type) {
  switch (type) {
    case "rancho":
      return "Agregar llave";

    case "llave":
      return "Agregar túnel";

    case "tunel":
      return "Agregar surco";

    case "surco":
      return "Agregar polín";

    case "polin":
      return "Registrar plantas";

    default:
      return "Agregar";
  }
}

function getInputLabel(type) {
  switch (type) {
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

function formatNodeName(type, value) {
  const cleanValue = value.trim();

  switch (type) {
    case "llave":
      return `Llave ${cleanValue}`;

    case "tunel":
      return `Túnel ${cleanValue}`;

    case "surco":
      return `Surco ${cleanValue}`;

    case "polin":
      return `Polín ${cleanValue}`;

    case "plantas":
      return `${cleanValue} plantas`;

    default:
      return cleanValue;
  }
}

function addChildToTree(nodes, parentId, newNode) {
  return nodes.map((node) => {
    if (node.id === parentId) {
      return {
        ...node,
        children: [...(node.children || []), newNode],
      };
    }

    if (node.children) {
      return {
        ...node,
        children: addChildToTree(
          node.children,
          parentId,
          newNode
        ),
      };
    }

    return node;
  });
}

function TreeNode({
  node,
  level = 0,
  selected,
  setSelected,
  expanded,
  toggleExpanded,
  openMenu,
  setOpenMenu,
  onAdd,
}) {
  const hasChildren =
    Array.isArray(node.children) &&
    node.children.length > 0;

  const isOpen = expanded[node.id];
  const isSelected = selected === node.id;
  const menuIsOpen = openMenu === node.id;

  return (
    <div className="relative">
      <div
        className={[
          "group flex w-full items-center gap-2 rounded-lg py-2 pr-2 text-sm transition-colors",
          isSelected
            ? "bg-[var(--agromatik-green-light)] font-medium text-[var(--agromatik-green)]"
            : "hover:bg-[var(--agromatik-green-light)]",
        ].join(" ")}
        style={{
          paddingLeft: `${8 + level * 14}px`,
        }}
      >
        <button
          type="button"
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(node.id);
            }
          }}
          className="flex h-5 w-5 shrink-0 items-center justify-center"
        >
          {hasChildren ? (
            isOpen ? (
              <ChevronDown size={15} />
            ) : (
              <ChevronRight size={15} />
            )
          ) : (
            <span className="h-[15px] w-[15px]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setSelected(node.id)}
          className="flex min-w-0 flex-1 items-center gap-2 text-left"
        >
          <span className="shrink-0">
            {getIcon(node.type)}
          </span>

          <span className="truncate">
            {node.name}
          </span>
        </button>

        {node.type !== "plantas" && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();

              setOpenMenu(
                menuIsOpen ? null : node.id
              );
            }}
            className="rounded-md p-1 transition hover:bg-black/5"
            aria-label={`Opciones de ${node.name}`}
          >
            <MoreHorizontal size={17} />
          </button>
        )}
      </div>

      {menuIsOpen && (
        <div className="absolute right-2 top-10 z-50 w-48 overflow-hidden rounded-xl border border-[var(--agromatik-border)] bg-[var(--agromatik-card)] shadow-lg">
          <button
            type="button"
            onClick={() => {
              onAdd(node);
              setOpenMenu(null);
            }}
            className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm transition hover:bg-[var(--agromatik-green-light)]"
          >
            <Plus size={16} />
            {getAddLabel(node.type)}
          </button>

          <button
            type="button"
            className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm transition hover:bg-[var(--agromatik-green-light)]"
          >
            <Pencil size={16} />
            Editar
          </button>

          <div className="border-t border-[var(--agromatik-border)]" />

          <button
            type="button"
            className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-red-600 transition hover:bg-red-50"
          >
            <Trash2 size={16} />
            Eliminar
          </button>
        </div>
      )}

      {hasChildren && isOpen && (
        <div>
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              selected={selected}
              setSelected={setSelected}
              expanded={expanded}
              toggleExpanded={toggleExpanded}
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
              onAdd={onAdd}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function RanchoStructureTree() {
  const [structureData, setStructureData] =
    useState(initialStructureData);

  const [selected, setSelected] =
    useState("rancho-1");

  const [openMenu, setOpenMenu] =
    useState(null);

  const [expanded, setExpanded] = useState({
    "rancho-1": true,
    "llave-l03": true,
    "tunel-t07": true,
    "surco-s04": true,
    "polin-p09": true,
  });

  const [modalData, setModalData] =
    useState(null);

  const [newValue, setNewValue] =
    useState("");

  const toggleExpanded = (id) => {
    setExpanded((previous) => ({
      ...previous,
      [id]: !previous[id],
    }));
  };

  const handleOpenAddModal = (node) => {
    const childType = getChildType(node.type);

    if (!childType) return;

    setModalData({
      parentId: node.id,
      parentName: node.name,
      childType,
    });

    setNewValue("");
  };

  const handleCloseModal = () => {
    setModalData(null);
    setNewValue("");
  };

  const handleCreate = () => {
    if (!modalData) return;

    if (!newValue.trim()) return;

    const id = `${modalData.childType}-${Date.now()}`;

    const newNode = {
      id,
      type: modalData.childType,
      name: formatNodeName(
        modalData.childType,
        newValue
      ),
    };

    if (modalData.childType !== "plantas") {
      newNode.children = [];
    }

    setStructureData((previous) =>
      addChildToTree(
        previous,
        modalData.parentId,
        newNode
      )
    );

    setExpanded((previous) => ({
      ...previous,
      [modalData.parentId]: true,
    }));

    setSelected(id);

    handleCloseModal();
  };

  return (
    <>
      <aside className="w-full rounded-2xl border border-[var(--agromatik-border)] bg-[var(--agromatik-card)] p-3">
        <div className="mb-4 rounded-xl bg-[var(--agromatik-green-light)] p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--agromatik-green)] text-white">
              <House size={20} />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-[var(--agromatik-text-secondary)]">
                Rancho seleccionado
              </p>

              <p className="truncate font-semibold">
                Rancho Tres Hermanos
              </p>
            </div>
          </div>
        </div>

        <div className="mb-2 px-2">
          <h2 className="text-sm font-semibold">
            Estructura
          </h2>

          <p className="mt-1 text-xs text-[var(--agromatik-text-secondary)]">
            Organización física y productiva
          </p>
        </div>

        <div className="space-y-0.5">
          {structureData.map((node) => (
            <TreeNode
              key={node.id}
              node={node}
              selected={selected}
              setSelected={setSelected}
              expanded={expanded}
              toggleExpanded={toggleExpanded}
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
              onAdd={handleOpenAddModal}
            />
          ))}
        </div>
      </aside>

      {modalData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl border border-[var(--agromatik-border)] bg-[var(--agromatik-card)] shadow-xl">
            <div className="flex items-center justify-between border-b border-[var(--agromatik-border)] px-5 py-4">
              <div>
                <h2 className="text-lg font-semibold">
                  {getAddLabel(
                    modalData.parentId === "rancho-1"
                      ? "rancho"
                      : modalData.childType === "tunel"
                      ? "llave"
                      : modalData.childType === "surco"
                      ? "tunel"
                      : modalData.childType === "polin"
                      ? "surco"
                      : "polin"
                  )}
                </h2>

                <p className="mt-1 text-sm text-[var(--agromatik-text-secondary)]">
                  Se agregará dentro de{" "}
                  {modalData.parentName}.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                className="rounded-lg p-2 transition hover:bg-[var(--agromatik-green-light)]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-5">
              <label className="mb-2 block text-sm font-medium">
                {getInputLabel(
                  modalData.childType
                )}
              </label>

              <input
                type={
                  modalData.childType === "plantas"
                    ? "number"
                    : "text"
                }
                value={newValue}
                onChange={(event) =>
                  setNewValue(event.target.value)
                }
                placeholder={getPlaceholder(
                  modalData.childType
                )}
                className="w-full rounded-lg border border-[var(--agromatik-border)] bg-[var(--agromatik-card)] px-3 py-2.5 outline-none transition focus:border-[var(--agromatik-green)]"
                autoFocus
              />
            </div>

            <div className="flex justify-end gap-2 border-t border-[var(--agromatik-border)] px-5 py-4">
              <button
                type="button"
                onClick={handleCloseModal}
                className="rounded-lg border border-[var(--agromatik-border)] px-4 py-2 text-sm font-medium transition hover:bg-[var(--agromatik-green-light)]"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={handleCreate}
                className="rounded-lg bg-[var(--agromatik-green)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}