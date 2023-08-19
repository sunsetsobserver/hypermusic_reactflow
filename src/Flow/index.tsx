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
      setNodes((prevNodes) => {
          return prevNodes.map((node) => {
              if (node.type === 'space') {
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
      console.log("Nodes after handleDimensionChange:", nodes);
    };

  const onConnect = (params: Connection | Edge) => {
    setEdges((eds) => addEdge(params, eds));

    setNodes((prevNodes) => {
        return prevNodes.map((node) => {
            if (node.id === params.target) {
                const sourceNode = prevNodes.find((n) => n.id === params.source);
                if (sourceNode && sourceNode.data) {
                    const existingDimensions = node.data?.dimensions || [];
                    const updatedDimensions = existingDimensions.concat({
                        dimensionName: sourceNode.data.dimensionName,
                        dimensionValues: JSON.stringify(sourceNode.data.dimensionValues)
                    });
                    return {
                        ...node,
                        data: { dimensions: updatedDimensions }
                    };
                }
            }
            return node;
        });
    });
    console.log("Nodes after onConnect:", nodes);
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