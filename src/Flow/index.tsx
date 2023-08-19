import ReactFlow, {
  useNodesState,
  useEdgesState,
  Panel,
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

  const onConnect = (params: { source: string | null; target: string | null }) => {
    if (!params.source || !params.target) return;
    const sourceNode = nodes.find((n) => n.id === params.source);
    const targetNode = nodes.find((n) => n.id === params.target);

    if (!sourceNode || !targetNode) return;

    if (targetNode.type === 'space' && sourceNode.data) {
      const updatedDimensions = targetNode.data.dimensions || [];
      updatedDimensions.push({
        dimensionName: sourceNode.data.dimensionName,
        dimensionValues: sourceNode.data.dimensionValues
      });
  
      const updatedNode = {
        ...targetNode,
        data: { dimensions: updatedDimensions }
      };
  
      setNodes((ns) => ns.map((n) => (n.id === targetNode.id ? updatedNode as Node : n)));
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
          <MainMenu setNodes={setNodes} />
        </Panel>
      </ReactFlow>
    </div>
  );
}

export default Flow;




