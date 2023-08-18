import React from 'react';
import { Handle, Position } from 'reactflow';

const SpaceNode: React.FC<any> = ({ data }) => {
  // Ensure data is defined and dimensions is always an array
  const dimensions = data?.dimensions || [];

  return (
    <div className="node spaceNode">
      <div className="node-title">Space</div>
      <div className="node-content">
        {dimensions.length > 0 ? (
          <div>
            <strong>Dimensions:</strong>
            <pre>{JSON.stringify(dimensions, null, 2)}</pre>
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
