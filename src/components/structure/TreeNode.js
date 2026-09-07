"use client";

import {
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  Plus,
  Pencil,
  Trash2,
  House,
  Droplets,
  Warehouse,
  Rows3,
  Fence,
  Leaf,
} from "lucide-react";

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

export default function TreeNode({
  node,
  level = 0,
  selected,
  setSelected,
  expanded,
  toggleExpanded,
  openMenu,
  setOpenMenu,
  onAdd,
  onEdit,
  onDelete,
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
      </div>

      {menuIsOpen && (
        <div className="absolute right-2 top-10 z-50 w-48 overflow-hidden rounded-xl border border-[var(--agromatik-border)] bg-[var(--agromatik-card)] shadow-lg">
          {node.type !== "plantas" && (
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
          )}

          <button
            type="button"
            onClick={() => {
              onEdit(node);
              setOpenMenu(null);
            }}
            className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm transition hover:bg-[var(--agromatik-green-light)]"
          >
            <Pencil size={16} />
            Editar
          </button>

          <div className="border-t border-[var(--agromatik-border)]" />

          <button
            type="button"
            onClick={() => {
              onDelete(node);
              setOpenMenu(null);
            }}
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
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}