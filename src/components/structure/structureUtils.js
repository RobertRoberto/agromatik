export function getChildType(type) {
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

export function formatNodeName(type, value) {
  const cleanValue = value.trim();

  switch (type) {
    case "rancho":
      return cleanValue;

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

export function getEditableValue(node) {
  switch (node.type) {
    case "llave":
      return node.name.replace("Llave ", "");

    case "tunel":
      return node.name.replace("Túnel ", "");

    case "surco":
      return node.name.replace("Surco ", "");

    case "polin":
      return node.name.replace("Polín ", "");

    case "plantas":
      return node.name.replace(" plantas", "");

    default:
      return node.name;
  }
}

export function addChildToTree(
  nodes,
  parentId,
  newNode
) {
  return nodes.map((node) => {
    if (node.id === parentId) {
      return {
        ...node,
        children: [
          ...(node.children || []),
          newNode,
        ],
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

export function updateNodeInTree(
  nodes,
  nodeId,
  newName
) {
  return nodes.map((node) => {
    if (node.id === nodeId) {
      return {
        ...node,
        name: newName,
      };
    }

    if (node.children) {
      return {
        ...node,
        children: updateNodeInTree(
          node.children,
          nodeId,
          newName
        ),
      };
    }

    return node;
  });
}

export function deleteNodeFromTree(
  nodes,
  nodeId
) {
  return nodes
    .filter((node) => node.id !== nodeId)
    .map((node) => ({
      ...node,

      children: node.children
        ? deleteNodeFromTree(
            node.children,
            nodeId
          )
        : node.children,
    }));
}