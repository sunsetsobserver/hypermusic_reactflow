import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';

const DimensionNode: React.FC<any> = ({ isConnectable, data }) => {
    const initialLabel = data && data.label ? data.label : 'Dimension';
    const [isEditingDimension, setIsEditingDimension] = useState(false);
    const [dimensionName, setDimensionName] = useState(initialLabel);

    const handleDimensionNameSubmit = () => {
        if (dimensionName.trim() !== '') {
            setIsEditingDimension(false);
            if (data && data.onChange) {
                data.onChange(dimensionName);
            }
        }
    };

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
            <input type="text" placeholder="Enter dimension values in []" />
            <br />
            <Handle type="source" position={Position.Bottom} style={{ background: '#555' }} isConnectable={isConnectable} />
        </div>
    );
};

export default DimensionNode;