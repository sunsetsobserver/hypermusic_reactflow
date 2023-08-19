//SpaceNode.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

const SpaceNode: React.FC<any> = ({ data }) => {
    data = data || {};
    console.log("SpaceNode data prop:", data);

    const [renderKey, setRenderKey] = useState(Math.random());
    const prevDataRef = useRef(data);

    console.log("SpaceNode Received Data:", data.dimensions);

    useEffect(() => {
        if (JSON.stringify(prevDataRef.current) !== JSON.stringify(data)) {
            setRenderKey(Math.random());
            prevDataRef.current = data;
        }
    }, [data]);
  
    return (
        <div className="node spaceNode" key={renderKey}>
        <div className="node-title">Space</div>
        <div className="node-content">
          {Object.keys(data.dimensions).length > 0 ? (
            <div>
              <strong>Dimensions:</strong>
              <pre>{JSON.stringify(data.dimensions, null, 2)}</pre>
            </div>
          ) : (
            <div>No dimensions connected.</div>
          )}
        </div>
        <Handle type="target" position={Position.Left} style={{ background: '#555' }} />
        <Handle type="source" position={Position.Right} style={{ background: '#555' }} />
      </div>
    );
};

export default SpaceNode;
