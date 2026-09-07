"use client";

import { useState } from "react";
import { House } from "lucide-react";

import TreeNode from "./TreeNode";
import StructureFormModal from "./StructureFormModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

import { initialStructureData } from "./structureData";

import {
  getChildType,
  formatNodeName,
  getEditableValue,
  addChildToTree,
  updateNodeInTree,
  deleteNodeFromTree,
} from "./structureUtils";

export default function RanchoStructureTree() {
  const [structureData, setStructureData] =
    useState(initialStructureData);

  const [selected, setSelected] =
    useState("rancho-1");

  const [openMenu, setOpenMenu] =
    useState(null);

  const [expanded, setExpanded] =
    useState({
      "rancho-1": true,
      "llave-l03": true,
      "tunel-t07": true,
      "surco-s04": true,
      "polin-p09": true,
    });

  const [formModal, setFormModal] =
    useState(null);

  const [deleteModal, setDeleteModal] =
    useState(null);

  const [formValue, setFormValue] =
    useState("");

  const toggleExpanded = (id) => {
    setExpanded((previous) => ({
      ...previous,
      [id]: !previous[id],
    }));
  };

  const handleAdd = (node) => {
    const childType =
      getChildType(node.type);

    if (!childType) return;

    setFormModal({
      mode: "add",
      parentId: node.id,
      parentName: node.name,
      type: childType,
    });

    setFormValue("");
  };

  const handleEdit = (node) => {
    setFormModal({
      mode: "edit",
      nodeId: node.id,
      nodeName: node.name,
      type: node.type,
    });

    setFormValue(
      getEditableValue(node)
    );
  };

  const handleDelete = (node) => {
    setDeleteModal({
      id: node.id,
      name: node.name,
      type: node.type,
    });
  };

  const closeFormModal = () => {
    setFormModal(null);
    setFormValue("");
  };

  const handleSaveForm = () => {
    if (!formModal) return;

    if (!formValue.trim()) return;

    if (formModal.mode === "add") {
      const id =
        `${formModal.type}-${Date.now()}`;

      const newNode = {
        id,
        type: formModal.type,
        name: formatNodeName(
          formModal.type,
          formValue
        ),
      };

      if (
        formModal.type !== "plantas"
      ) {
        newNode.children = [];
      }

      setStructureData((previous) =>
        addChildToTree(
          previous,
          formModal.parentId,
          newNode
        )
      );

      setExpanded((previous) => ({
        ...previous,
        [formModal.parentId]: true,
      }));

      setSelected(id);
    }

    if (formModal.mode === "edit") {
      const updatedName =
        formatNodeName(
          formModal.type,
          formValue
        );

      setStructureData((previous) =>
        updateNodeInTree(
          previous,
          formModal.nodeId,
          updatedName
        )
      );
    }

    closeFormModal();
  };

  const confirmDelete = () => {
    if (!deleteModal) return;

    setStructureData((previous) =>
      deleteNodeFromTree(
        previous,
        deleteModal.id
      )
    );

    if (
      selected === deleteModal.id
    ) {
      setSelected("rancho-1");
    }

    setExpanded((previous) => {
      const updated = {
        ...previous,
      };

      delete updated[
        deleteModal.id
      ];

      return updated;
    });

    setDeleteModal(null);
  };

  const selectedRanchoName =
    structureData[0]?.name ||
    "Sin rancho";

  return (
    <>
      <aside className="w-full rounded-2xl border border-border bg-surface p-3">
        <div className="mb-4 rounded-xl bg-primary-soft p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
              <House size={20} />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-muted">
                Rancho seleccionado
              </p>

              <p className="truncate font-semibold text-foreground">
                {selectedRanchoName}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-2 px-2">
          <h2 className="text-sm font-semibold text-foreground">
            Estructura
          </h2>

          <p className="mt-1 text-xs text-muted">
            Organización física y productiva
          </p>
        </div>

        <div className="space-y-0.5">
          {structureData.map(
            (node) => (
              <TreeNode
                key={node.id}
                node={node}
                selected={selected}
                setSelected={setSelected}
                expanded={expanded}
                toggleExpanded={
                  toggleExpanded
                }
                openMenu={openMenu}
                setOpenMenu={
                  setOpenMenu
                }
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={
                  handleDelete
                }
              />
            )
          )}
        </div>
      </aside>

      <StructureFormModal
        modal={formModal}
        value={formValue}
        setValue={setFormValue}
        onClose={closeFormModal}
        onSave={handleSaveForm}
      />

      <DeleteConfirmationModal
        node={deleteModal}
        onCancel={() =>
          setDeleteModal(null)
        }
        onConfirm={confirmDelete}
      />
    </>
  );
}