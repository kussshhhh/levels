import React, { useState, useRef, useEffect } from 'react';
import { PlusCircle, Maximize2 } from 'lucide-react';

const Node = ({ id, level, text, position, scale, onAddNode, onUpdateNode, onDrag }) => {
  const [nodeText, setNodeText] = useState(text);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const nodeRef = useRef(null);

  const handleMouseDown = (e) => {
    const rect = nodeRef.current.getBoundingClientRect();
    setDragOffset({
      x: (e.clientX - rect.left) / scale,
      y: (e.clientY - rect.top) / scale,
    });
    setIsDragging(true);
  };

  const handleTextChange = (e) => {
    setNodeText(e.target.value);
    onUpdateNode(id, e.target.value);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const newX = e.clientX / scale - dragOffset.x;
        const newY = e.clientY / scale - dragOffset.y;
        onDrag(id, { x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, id, onDrag, scale]);

  return (
    <div className="node-container" style={{ left: `${position.x}px`, top: `${position.y}px`, transform: `scale(${scale})` }}>
      <div ref={nodeRef} className="node-brick" onMouseDown={handleMouseDown}>
        <div className="node-level">Level {level}</div>
        <textarea
          value={nodeText}
          onChange={handleTextChange}
          className="node-textarea"
        />
        <Maximize2 className="node-fullscreen" size={16} />
      </div>
      <div className="node-add-button" onClick={() => onAddNode(id)}>
        <PlusCircle size={24} />
      </div>
    </div>
  );
};

export default Node;