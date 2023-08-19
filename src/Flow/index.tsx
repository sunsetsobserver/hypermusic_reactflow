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

    const handleDimensionChange = (dimensionNodeId: string, dimensionName: string, dimensionValues: string) => {
      setNodes((prevNodes) => {
          return prevNodes.map((node) => {
              // Check if there's an edge connecting this node to the edited DimensionNode
              const isConnected = edges.some(edge => edge.source === dimensionNodeId && edge.target === node.id);
              if (node.type === 'space' && isConnected) {
                  const parsedDimensionValues = JSON.parse(dimensionValues);
                  const updatedDimensions = {
                      ...(node.data.dimensions || {}),
                      [dimensionName]: parsedDimensionValues
                  };
                  return {
                      ...node,
                      data: {
                          ...node.data,
                          dimensions: updatedDimensions
                      }
                  };
              }
              return node;
          });
      });
  };
  

  const onConnect = (params: Connection | Edge) => {
    setEdges((eds) => addEdge(params, eds));
    setNodes((prevNodes) => {
        const updatedNodes = prevNodes.map((node) => {
            if (node.id === params.target) {
                const sourceNode = prevNodes.find((n) => n.id === params.source);
                if (sourceNode && sourceNode.data) {
                    const existingDimensions = node.data?.dimensions || [];
                    
                    const updatedDimensions = existingDimensions.concat({
                        dimensionName: sourceNode.data.dimensionName,
                        dimensionValues: sourceNode.data.dimensionValues
                    });
                    return {
                        ...node,
                        data: { dimensions: updatedDimensions }
                    };
                }
            }
            return node;
        });
        return updatedNodes; // Return the updated nodes array
    });
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