import { useCallback, useState } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges, Background, Controls, Panel } from 'reactflow';
import 'reactflow/dist/style.css';

import SpaceNode from './SpaceNode.js';
import MainMenu from './MainMenu.js';

import './Flow.css'

const initialNodes = [
  { id: 'node-1', type: 'space', position: { x: 0, y: 0 }, data: { value: 123 } },
  {
    id: 'node-2',
    type: 'output',
    targetPosition: 'top',
    position: { x: 0, y: 200 },
    data: { label: 'node 2' },
  },
];

const initialEdges = [
  { id: 'edge-1', source: 'node-1', target: 'node-2', sourceHandle: 'a' },
];

const edgeOptions = {
  animated: true,
  style: {
    stroke: 'black',
  },
};

const nodeTypes = { space: SpaceNode };

const proOptions = { hideAttribution: true };

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );
  const handleSpaceCreation = () => {
    const newSpaceNode = {
        id: (Math.random() * 1000).toString(),
        type: 'space',
        position: { x: 0, y: 0 },
        data: { value: 123 }
    };
    setNodes(
      (prevNodes) => {
        const updatedNodes = [...prevNodes, newSpaceNode];
        return updatedNodes;}
    );
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
      proOptions={proOptions}
      defaultEdgeOptions={edgeOptions}
    >
      <Panel position="top-left">
        <MainMenu handleSpaceCreation={handleSpaceCreation}/>
      </Panel>
      <Background />
      <Controls />
    </ReactFlow>
  );
}

export default Flow;