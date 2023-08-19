import React, { useCallback } from 'react';
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Panel,
  type Connection,
  type Edge,
  type Node,
} from 'reactflow';

import CustomNode from './CustomNode';
import MainMenu from './MainMenu';
import SpaceNode from './SpaceNode';
import DimensionNode from './DimensionNode';

import 'reactflow/dist/style.css';
import './Flow.css';

const nodeTypes = {
  custom: CustomNode,
  space: SpaceNode,
  dimension: DimensionNode,
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection | Edge) => {
      setEdges((eds) => addEdge(params, eds));
  
      const sourceNode = nodes.find((node) => node.id === params.source);
      const targetNode = nodes.find((node) => node.id === params.target);
  
      if (targetNode && targetNode.type === 'space' && sourceNode && sourceNode.data) {
        const updatedDimensions = {
          ...(targetNode.data.dimensions || {}),
          [sourceNode.data.dimensionName]: JSON.parse(sourceNode.data.dimensionValues)
        };
        const updatedNode = {
          ...targetNode,
          data: { dimensions: updatedDimensions }
        };
        setNodes((ns) => ns.map((n) => (n.id === targetNode.id ? updatedNode : n)));
      }
    },
    [setEdges, nodes, setNodes]
);

  return (
    <div className="Flow">
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={nodeTypes}
      >
        <Panel position="top-left">
          <MainMenu setNodes={setNodes} />
        </Panel>
      </ReactFlow>
    </div>
  );
}

export default Flow;




