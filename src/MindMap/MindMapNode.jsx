import React, { useState, useRef, useEffect, forwardRef } from "react";
import "./styles.css";

const MindMapNode = forwardRef(
  ({ name, onAddChild, children, level, updateValue }, ref) => {
    const firstElementRef = useRef(null);
    const lastElementRef = useRef(null);
    const [position, setPosition] = useState({
      y: 0,
      x: 0,
    });
    const [columnHeight, setColumnHeight] = useState(0);
    const levelNode = level + 1;
    const handleAddChild = () => {
      onAddChild(name, `${name}-${children.length}`);
    };
    const updateHeight = () => {
      if (firstElementRef.current && lastElementRef.current) {
        const firstElement = firstElementRef.current.getBoundingClientRect();
        const lastElement = lastElementRef.current.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        setColumnHeight(lastElement.top - firstElement.top);
        setPosition({
          x: firstElement.x - 16,
          y: firstElement.y + scrollTop + firstElement.height / 2,
        });
      }
    };

    useEffect(() => {
      updateHeight();
    }, [updateValue]);

    return (
      <div className="node">
        {!!children.length && (
          <div
            style={{
              top: position.y,
              left: position.x,
              height: columnHeight,
              position: "absolute",
              background: "black",
              right: -16,
              width: 1,
            }}
          />
        )}
        <div
          ref={ref}
          className={`node__container ${level && " before_line"} ${
            children.length && " after_line"
          }`}
          style={{ marginLeft: 32 }}
        >
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
                key={child.name}
                name={child.name}
                onAddChild={onAddChild}
                children={child.children}
                level={levelNode}
                index={index}
                updateValue={updateValue}
                ref={
                  index === 0
                    ? firstElementRef
                    : index === children.length - 1
                    ? lastElementRef
                    : null
                }
              />
            ))}
        </div>
      </div>
    );
  }
);

export default MindMapNode;
