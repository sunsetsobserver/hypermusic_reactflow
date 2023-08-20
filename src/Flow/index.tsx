//index.tsx
import { useEffect, useRef } from 'react';
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

  const updateNodeData = (nodeId: string, newData: any) => {
    setNodes((prevNodes) => {
      const nodesCopy = [...prevNodes];
      return nodesCopy.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              ...newData
            }
          };
        }
        return node;
      });
    });
    const updatedDimensionNode = nodes.find(n => n.id === nodeId);
    console.log("Updated DimensionNode in main state:", updatedDimensionNode);
  };

  const handleDimensionChange = (dimensionNodeId: string, dimensionName: string, dimensionValues: string) => {
    setNodes(prevNodes => {
      const nodesCopy = [...prevNodes];
      const relatedDimensionNode = nodesCopy.find(n => n.id === dimensionNodeId);

      if (!relatedDimensionNode) {
        console.error("DimensionNode not found!");
        return prevNodes;
      }

      return nodesCopy.map(node => {
        const isConnected = edges.some(edge => edge.source === dimensionNodeId && edge.target === node.id);
        
        if (node.type === 'space' && isConnected) {
          const parsedDimensionValues = JSON.parse(dimensionValues);
          return {
            ...node,
            data: {
              ...node.data,
              dimensions: {
                ...(node.data.dimensions || {}),
                [dimensionName]: parsedDimensionValues
              }
            }
          };
        }
        return node;
      });
    });
  };

  const onConnect = (params: Connection | Edge) => {
    if (params.sourceHandle === "dimensionHandle" && params.targetHandle === "spaceHandle") {
      setEdges((eds) => {
        return addEdge(params, eds);
      });

      setNodes((prevNodes) => {
        const nodesCopy = [...prevNodes];
        const sourceNode = nodesCopy.find((n) => n.id === params.source);

        if (sourceNode && sourceNode.data) {
          return nodesCopy.map((node) => {
            if (node.id === params.target) {
              const existingDimensions = node.data?.dimensions || {};
              const updatedDimensions = {
                ...existingDimensions,
                [sourceNode.data.dimensionName]: JSON.parse(sourceNode.data.dimensionValues)
              };
              return {
                ...node,
                data: { dimensions: updatedDimensions }
              };
            }
            return node;
          });
        }
        return nodesCopy;
      });
    }
  };

  const prevEdgesRef = useRef<Edge[]>([]);
  const prevNodesRef = useRef<Node[]>([]);

  useEffect(() => {
    const removedEdges = prevEdgesRef.current.filter(prevEdge => !edges.some(edge => edge.id === prevEdge.id));
    removedEdges.forEach(removedEdge => {
        if (removedEdge.sourceHandle === "dimensionHandle" && removedEdge.targetHandle === "spaceHandle") {
            setNodes((prevNodes) => {
                return prevNodes.map((node) => {
                    if (node.id === removedEdge.target) {
                        const updatedDimensions = { ...node.data.dimensions };
                        const sourceNode = prevNodesRef.current.find(n => n.id === removedEdge.source);
                        if (sourceNode) {
                            delete updatedDimensions[sourceNode.data.dimensionName];
                        }
                        return {
                            ...node,
                            data: { dimensions: updatedDimensions }
                        };
                    }
                    return node;
                });
            });
        }
    });
    prevEdgesRef.current = edges;
  }, [edges]);


  useEffect(() => {
    const removedNodes = prevNodesRef.current.filter(prevNode => !nodes.some(node => node.id === prevNode.id));
    removedNodes.forEach(removedNode => {
        if (removedNode.type === 'dimension') {
            setNodes((prevNodes) => {
                return prevNodes.map((node) => {
                    if (node.type === 'space' && node.data.dimensions[removedNode.data.dimensionName]) {
                        const updatedDimensions = { ...node.data.dimensions };
                        delete updatedDimensions[removedNode.data.dimensionName];
                        return {
                            ...node,
                            data: { dimensions: updatedDimensions }
                        };
                    }
                    return node;
                });
            });
        }
    });
    prevNodesRef.current = nodes;
  }, [nodes]);


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
          <MainMenu setNodes={setNodes} handleDimensionChange={handleDimensionChange} updateNodeData={updateNodeData} />
        </Panel>
      </ReactFlow>
    </div>
  );
}

export default Flow;
