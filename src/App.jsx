import React, { useState, useEffect, useCallback } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, Controls, Position, Background, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';
import MessageNode from './components/MessageNode';
import ConfigPanel from './components/ConfigPanel';
import './App.css';
import NodePanel from './components/NodePanel';
import Header from './components/Header';

const connectionLineStyle = { stroke: 'black' };
const nodeTypes = {
  messageNode: MessageNode,
};

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [focusedNode, setFocusedNode] = useState(null);
  const reactFlowInstance = useReactFlow();

  useEffect(() => {
    // initial nodes and edges
    setNodes([
      {
        id: '1',
        type: 'messageNode',
        data: {
          label: 'Messages Node',
          onfocus: () => setFocusedNode('1'),
        },
        position: { x: 365, y: 25 },
        targetPosition: Position.Top,
      },
    ]);

    setEdges([
      {
        id: 'e1-2',
        source: '1',
        target: '2',
        animated: true,
        style: { stroke: '#aaa' },
      },
    ]);
  }, []);

  // to add a new node on drop
  const handleDrop = (event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData('application/reactflow');
    // get the drop position relative to the react flow
    const position = reactFlowInstance.screenToFlowPosition({ x: event.clientX, y: event.clientY});
    console.log(position);
    const newNode = {
      id: (nodes.length + 1).toString(),
      type,
      position: position,
      data: { label: `Add Message`, onfocus: () => setFocusedNode((nodes.length + 1).toString()) },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const onConnect = useCallback(
    (params) => {
      const existingEdgesFromSource = edges.filter(edge => edge.source === params.source);
      // prevent multiple edges from the same source
      if (existingEdgesFromSource.length === 0) {
        setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#aaa' } }, eds));
      }
    },
    [edges, setEdges]
  );

  const updateNodeLabel = (id, label) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? {
            ...node,
            data: {
              ...node.data,
              label,
            },
          }
          : node
      )
    );
  };

  const onSave = () => {
    const targetCounts = nodes.reduce((acc, node) => {
      acc[node.id] = edges.filter(edge => edge.target === node.id).length;
      return acc;
    }, {});
// handle the case where more than one node has empty target handles
    const nodesWithEmptyTarget = nodes.filter(node => targetCounts[node.id] === 0);
    if (nodes.length > 1 && nodesWithEmptyTarget.length > 1) {
      alert('Error: More than one node has empty target handles.');
    } else {
      alert('Save successful!');
    }
  };

  return (
    <>
    <Header onSave={onSave} />
      <div className='dndflow'>
            <div className="reactflow-wrapper" onDrop={handleDrop} onDragOver={handleDragOver}>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                connectionLineStyle={connectionLineStyle}
                defaultViewport={defaultViewport}
              >
                <Controls />
                <Background color="#aaa" gap={16} />
              </ReactFlow>
            </div>
            {focusedNode ? (
              <ConfigPanel
                onClose={() => setFocusedNode(null)}
                nodeId={focusedNode}
                updateNodeLabel={updateNodeLabel}
              />
            ) : (
              <NodePanel />
            )}
          </div>
    </>
  );
};

export default App;
