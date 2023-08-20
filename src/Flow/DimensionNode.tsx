//DimensionNode.tsx
import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';

const DimensionNode: React.FC<any> = ({ id, isConnectable, data }) => {
  const initialLabel = data && data.label ? data.label : 'Dimension';
  const [isEditingDimension, setIsEditingDimension] = useState(false);
  const [dimensionName, setDimensionName] = useState(initialLabel);
  const [dimensionValues, setDimensionValues] = useState('[]');

  const handleDimensionNameSubmit = () => {
    if (dimensionName.trim() !== '') {
      setIsEditingDimension(false);
      if (data && data.onChange) {
        data.onChange(id, dimensionName, dimensionValues);
      }
      data.updateNodeData(id, { dimensionName, dimensionValues });
    }
  };

  console.log("Internal state of DimensionNode:", { dimensionName, dimensionValues });
  
  return (
    <div className="dimensionNode">
      {isEditingDimension ? (
        <input
          value={dimensionName}
          onChange={(e) => setDimensionName(e.target.value)}
          onBlur={handleDimensionNameSubmit}
        />
      ) : (
        <div onClick={() => setIsEditingDimension(true)}>{dimensionName}</div>
      )}
      <br/>
      <input 
        type="text" 
        placeholder="Enter dimension values in []" 
        value={dimensionValues}
        onChange={(e) => setDimensionValues(e.target.value)}
        onBlur={handleDimensionNameSubmit}
      />
      <br />
      <Handle type="source" position={Position.Bottom} id="dimensionHandle" style={{ background: '#555' }} isConnectable={isConnectable} />
    </div>
  );
};

export default DimensionNode;

