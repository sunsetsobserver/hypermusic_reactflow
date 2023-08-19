//index.tsx
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

  const handleDimensionChange = (dimensionName: string, dimensionValues: string) => {
    const spaceNode = nodes.find((node) => node.type === 'space');
    if (spaceNode) {
        const parsedDimensionValues = JSON.parse(dimensionValues);
        const updatedDimensions = {
            ...(spaceNode.data.dimensions || {}),
            [dimensionName]: parsedDimensionValues
        };
        const updatedNode = {
            ...spaceNode,
            data: {
                ...spaceNode.data, // Keep the existing data
                dimensions: updatedDimensions // Update only the dimensions
            }
        };
        console.log("Updated SpaceNode:", updatedNode); // Log the updated node for debugging
        setNodes((ns) => ns.map((n) => (n.id === spaceNode.id ? updatedNode : n)));
    }
  };

  const onConnect = (params: Connection | Edge) => {
    setEdges((eds) => addEdge(params, eds));

    const sourceNode = nodes.find((node) => node.id === params.source);
    const targetNode = nodes.find((node) => node.id === params.target);

    if (targetNode && targetNode.type === 'space' && sourceNode && sourceNode.data) {
        // Ensure that targetNode.data exists and has a dimensions property
        const existingDimensions = targetNode.data?.dimensions || {};

        const updatedDimensions = existingDimensions.concat({
          dimensionName: sourceNode.data.dimensionName,
          dimensionValues: JSON.stringify(sourceNode.data.dimensionValues)
        });        

        const updatedNode = {
            ...targetNode,
            data: { dimensions: updatedDimensions }
        };

        setNodes((ns) => ns.map((n) => (n.id === targetNode.id ? updatedNode : n)));
    }
  };


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
          <MainMenu setNodes={setNodes} handleDimensionChange={handleDimensionChange} />
        </Panel>
      </ReactFlow>
    </div>
  );
}

export default Flow;