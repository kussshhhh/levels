import React, { useState, useRef, useEffect } from 'react';
import { PlusCircle, ZoomIn, ZoomOut } from 'lucide-react';
import Node from './Node';

const Canvas = () => {
  const [nodes, setNodes] = useState([
    { id: 1, level: 1, text: '', position: { x: 50, y: 400 } },
  ]);
  const [scale, setScale] = useState(1);
  const canvasRef = useRef(null);

  const addNode = (parentId) => {
    const parentIndex = nodes.findIndex((node) => node.id === parentId);
    const newId = nodes.length + 1;
    const newLevel = nodes[parentIndex].level + 1;
    const newNode = {
      id: newId,
      level: newLevel,
      text: '',
      position: { x: nodes[parentIndex].position.x + 150, y: nodes[parentIndex].position.y + 100 },
    };

    const updatedNodes = [
      ...nodes.slice(0, parentIndex + 1),
      newNode,
      ...nodes.slice(parentIndex + 1).map((node) => ({
        ...node,
        level: node.level >= newLevel ? node.level + 1 : node.level,
      })),
    ];

    setNodes(updatedNodes);
  };

  const updateNode = (id, newText) => {
    setNodes(nodes.map((node) => (node.id === id ? { ...node, text: newText } : node)));
  };

  const handleDrag = (id, newPosition) => {
    setNodes(nodes.map((node) => (node.id === id ? { ...node, position: newPosition } : node)));
  };

  const handleZoom = (delta) => {
    setScale((prevScale) => Math.max(0.1, Math.min(prevScale + delta, 2)));
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', border: '1px solid #ccc', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000 }}>
        <button onClick={() => handleZoom(0.1)}><ZoomIn size={20} /></button>
        <button onClick={() => handleZoom(-0.1)}><ZoomOut size={20} /></button>
      </div>
      <div
        ref={canvasRef}
      
        className='canvas'
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: '100%',
          height: '100%',
          zIndex:  5 
        }}
      >
        <svg
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            pointerEvents: 'none',
          }}
        >
          {nodes.map((node, index) => {
            if (index === 0) return null;
            const parent = nodes[index - 1];
            return (
              <line
                key={`line-${node.id}`}
                x1={parent.position.x + 75}
                y1={parent.position.y + 50}
                x2={node.position.x + 75}
                y2={node.position.y}
                stroke="black"
              />
            );
          })}
        </svg>
        {nodes.map((node) => (
          <Node
            key={node.id}
            {...node}
            scale={scale}
            onAddNode={addNode}
            onUpdateNode={updateNode}
            onDrag={handleDrag}
            zIndex='1000'
          />
        ))}
      </div>
    </div>
  );
};

export default Canvas;