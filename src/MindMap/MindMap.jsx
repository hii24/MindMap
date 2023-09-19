import React, { useState } from "react";
import "./styles.css";

function MindMapNode({ name, onAddChild, children, level, index }) {
  const levelNode = level + 1;
  const handleAddChild = () => {
    onAddChild(name, `${name}-${children.length}`);
  };
  return (
    <div className="node">
      <div className="node__container" style={{ marginLeft: 60 }}>
        <p>{name}</p>
        <button onClick={handleAddChild}>+</button>
      </div>
      <div
        style={{
          flexDirection: "column",
        }}
      >
        {children &&
          children.map((child, index) => (
            <MindMapNode
              name={child.name}
              onAddChild={onAddChild}
              children={child.children}
              level={levelNode}
              index={index}
            />
          ))}
      </div>
    </div>
  );
}

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
      console.log(childName);
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
        level={0}
        index={0}
        parenIndex={0}
      />
    </div>
  );
}

export default MindMap;
