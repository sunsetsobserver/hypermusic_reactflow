//SpaceNode.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

const SpaceNode: React.FC<any> = ({ data }) => {
    console.log("Data received by SpaceNode:", data);

    data = data || {};

    const [renderKey, setRenderKey] = useState(Math.random());
    const prevDataRef = useRef(data);

    useEffect(() => {
        if (JSON.stringify(prevDataRef.current) !== JSON.stringify(data)) {
            console.log("Data changed, forcing re-render for SpaceNode.");  // Log this line
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
        <Handle type="target" position={Position.Left} id="spaceHandle" style={{ background: '#555' }} />
      </div>
    );
};

export default SpaceNode;
