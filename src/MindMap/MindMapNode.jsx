import React, { useState, useRef, useEffect, forwardRef } from "react";
import "./styles.css";
import MindMapLink from "./MindMapLink";

const MindMapNode = ({
  name,
  onAddChild,
  children,
  level,
  updateValue,
  parentPosition,
}) => {
  const nodeRef = useRef(null);
  const [position, setPosition] = useState({
    y: 0,
    x: 0,
    width: 0,
    height: 0,
  });
  const levelNode = level + 1;

  const handleAddChild = () => {
    onAddChild(name, `${name}-${children.length}`);
  };
  const calculateLinkCoordinates = () => {
    if (nodeRef.current) {
      const node = nodeRef.current.getBoundingClientRect();
      setPosition({
        y: node.y,
        x: node.x,
        width: node.width,
        height: node.height,
      });
      console.log(node, "node");
    }
  };


  useEffect(() => {
    calculateLinkCoordinates();
  }, [updateValue]);

  return (
    <div className="node">
      <div ref={nodeRef} className="node__container" style={{ marginLeft: 32 }}>
        <p onClick={() => console.log(position)}>{name}</p>
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
              key={child.name}
              name={child.name}
              onAddChild={onAddChild}
              children={child.children}
              level={levelNode}
              index={index}
              updateValue={updateValue}
              parentPosition={position}
            />
          ))}
      </div>
      {!!level && (
        <MindMapLink
          startX={position.x}
          startY={position.y + position.height / 2}
          endX={parentPosition.x + parentPosition.width}
          endY={parentPosition.y + parentPosition.height / 2}
        />
      )}
    </div>
  );
};

export default MindMapNode;
