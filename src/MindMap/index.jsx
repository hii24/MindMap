import React, { useState } from "react";
import MindMapNode from "./MindMapNode";
import "./styles.css";

function MindMap() {
  const [mindMapData, setMindMapData] = useState({
    name: "child 0",
    children: [],
  });
  const handleAddChild = (parentName, childName) => {
    const updatedData = { ...mindMapData };
    findAndAddChild(updatedData, parentName, childName);
    setMindMapData(updatedData);
  };

  const findAndAddChild = (node, parentName, childName) => {
    if (node.name === parentName) {
      node.children.push({ name: childName, children: [] });
    } else {
      for (let child of node.children) {
        findAndAddChild(child, parentName, childName);
      }
    }
  };

  return (
    <div className="mind-map">
      <MindMapNode
        name={mindMapData.name}
        children={mindMapData.children}
        onAddChild={handleAddChild}
        updateHeightParen={() => {}}
        level={0}
        index={0}
      />
    </div>
  );
}

export default MindMap;
