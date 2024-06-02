import React from 'react';
import MessageNode from './MessageNode';

const NodePanel = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="node-panel">
      <div>
        <h4>Node Panel</h4>
      </div>
      <div onDragStart={(event) => onDragStart(event, 'messageNode')} draggable>
        <MessageNode panelMode data={{ label: 'Messages Node' }} />
      </div>
    </aside>
  );
};

export default NodePanel;
