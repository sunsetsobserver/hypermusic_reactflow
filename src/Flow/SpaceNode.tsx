import React from 'react';
import { Handle, Position } from 'reactflow';

const SpaceNode: React.FC<any> = ({ data }) => {
    // Ensure data is defined and dimensions is always an array
    const dimensions = data?.dimensions || [];
  
    // Create the combined object
    const combinedDimensions = dimensions.reduce((acc: Record<string, any[]>, dimension: { dimensionName: string, dimensionValues: string }) => {
      acc[dimension.dimensionName] = JSON.parse(dimension.dimensionValues);
      return acc;
    }, {});
  
    return (
      <div className="node spaceNode">
        <div className="node-title">Space</div>
        <div className="node-content">
          {dimensions.length > 0 ? (
            <div>
              <strong>Dimensions:</strong>
              <pre>{JSON.stringify(combinedDimensions, null, 2)}</pre>
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
  
  
