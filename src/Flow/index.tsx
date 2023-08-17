import { useCallback } from 'react';
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

// Importing styles from the lib
import 'reactflow/dist/style.css';
import './Flow.css';

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes: Node[] = [
];

const initialEdges: Edge[] = [
];

function Flow() {

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="Flow">
            <ReactFlow nodes={nodes} onNodesChange={onNodesChange} edges={edges} onEdgesChange={onEdgesChange} onConnect={onConnect} fitView nodeTypes={nodeTypes} >
                <Panel position="top-left">
                    <MainMenu setNodes={setNodes} />
                </Panel>
            </ReactFlow>
    </div>
  );
}

export default Flow;

