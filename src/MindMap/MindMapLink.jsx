import React, { useState, useEffect } from "react";

const MindMapLink = ({ startX, startY, endX, endY }) => {
  const [path, setPath] = useState("");

  useEffect(() => {
    const midX = (startX + endX) / 2;
    
    const controlPoint1X = midX;
    const controlPoint1Y = startY;
    const controlPoint2X = midX;
    const controlPoint2Y = endY;
    
    const pathString = `M${startX},${startY} Q${controlPoint1X},${controlPoint1Y} ${midX},${(startY + endY) / 2} Q${controlPoint2X},${controlPoint2Y} ${endX},${endY}`;
    
    setPath(pathString);
  }, [startX, startY, endX, endY]);

  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "10000%",
        height: "10000%",
        zIndex: -1,
      }}
    >
      <path
        d={path}
        fill="transparent"
        stroke="black"
        strokeWidth={1}
      />
    </svg>
  );
};

export default MindMapLink;
