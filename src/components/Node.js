import React, { useState, useRef, useEffect } from 'react';
import { PlusCircle, ZoomIn, ZoomOut } from 'lucide-react';

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
    <div
      ref={nodeRef}
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        border: '2px solid black',
        borderRadius: '10px',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'move',
        backgroundColor: 'white',
      }}
      onMouseDown={handleMouseDown}
    >
      <div>Level {level}</div>
      <textarea
        value={nodeText}
        onChange={handleTextChange}
        style={{ resize: 'both', minWidth: '100px', minHeight: '50px' }}
      />
      <PlusCircle onClick={() => onAddNode(id)} style={{ cursor: 'pointer' }} />
    </div>
  );
};

export default Node 