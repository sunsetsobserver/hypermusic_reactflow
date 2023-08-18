import React, { useState, useEffect, useRef, memo } from 'react';
import { Handle, Position } from 'reactflow';

const SpaceNode: React.FC<any> = ({ isConnectable, data }) => {
  const initialLabel = data && data.label ? data.label : 'Space';
  const [isEditingSpace, setIsEditingSpace] = useState(false);
  const [spaceName, setSpaceName] = useState(initialLabel);
  const [dimensionCount, setDimensionCount] = useState(1);
  const [dimensions, setDimensions] = useState([{ name: 'Dimension 1', size: 1, isEditing: false }]);

  const handleSpaceNameSubmit = () => {
    if (spaceName.trim() !== '') {
      setIsEditingSpace(false);
      if (data && data.onChange) {
        data.onChange(spaceName);
      }
    }
  };

  const handleScroll = (e: React.WheelEvent) => {
    e.stopPropagation();
  };

  const incrementDimensionCount = () => {
    setDimensionCount(prevCount => prevCount + 1);
  };

  const decrementDimensionCount = () => {
    setDimensionCount(prevCount => Math.max(1, prevCount - 1));
  };

  const dimensionsSectionRef = useRef<HTMLDivElement>(null);

  const scrollUp = () => {
    if (dimensionsSectionRef.current) {
      dimensionsSectionRef.current.scrollTop -= 30; // adjust this value as needed
    }
  };

  const scrollDown = () => {
    if (dimensionsSectionRef.current) {
      dimensionsSectionRef.current.scrollTop += 30; // adjust this value as needed
    }
  };

  useEffect(() => {
    setDimensions(prevDimensions => {
      const newDimensions = [...prevDimensions];
      if (dimensionCount > prevDimensions.length) {
        for (let i = prevDimensions.length; i < dimensionCount; i++) {
          newDimensions.push({ name: `Dimension ${i + 1}`, size: 1, isEditing: false });
        }
      } else if (dimensionCount < prevDimensions.length) {
        newDimensions.length = dimensionCount;
      }
      return newDimensions;
    });
  }, [dimensionCount]);

  return (
    <div className="spaceNode">
      {isEditingSpace ? (
        <input
          value={spaceName}
          onChange={(e) => setSpaceName(e.target.value)}
          onBlur={handleSpaceNameSubmit}
        />
      ) : (
        <div onClick={() => setIsEditingSpace(true)}>{spaceName}</div>
      )}
      <br></br>
      <div>
        Number of dimensions:
        <br></br>
        <button onClick={decrementDimensionCount}>-</button>
        <input type="text" value={dimensionCount} readOnly />
        <button onClick={incrementDimensionCount}>+</button>
      </div>
      <br></br>

        <div className="dimensionsControls">
            <button onClick={scrollUp}>▲</button>
            <div className="dimensionsSection" ref={dimensionsSectionRef} onWheel={handleScroll}>

                {dimensions.map((dimension, index) => (
                    <div key={index}>
                    {dimension.isEditing ? (
                        <input
                        value={dimension.name}
                        onChange={(e) => {
                            const newDimensions = [...dimensions];
                            newDimensions[index].name = e.target.value;
                            setDimensions(newDimensions);
                        }}
                        onBlur={() => {
                            const newDimensions = [...dimensions];
                            newDimensions[index].isEditing = false;
                            setDimensions(newDimensions);
                        }}
                        />
                    ) : (
                        <span onClick={() => {
                        const newDimensions = [...dimensions];
                        newDimensions[index].isEditing = true;
                        setDimensions(newDimensions);
                        }}>
                        {dimension.name}
                        </span>
                    )}
                    <div>
                        Size:
                        <button onClick={() => {
                        const newDimensions = [...dimensions];
                        newDimensions[index].size = Math.max(1, newDimensions[index].size - 1);
                        setDimensions(newDimensions);
                        }}>-</button>
                        <input type="text" value={dimension.size} readOnly />
                        
                        <button onClick={() => {
                        const newDimensions = [...dimensions];
                        newDimensions[index].size += 1;
                        setDimensions(newDimensions);
                        }}>+</button>
                    </div>
                    <br></br>
                    </div>
                ))}

            </div>
            <button onClick={scrollDown}>▼</button>
        </div>
      <Handle type="source" position={Position.Right} style={{ background: '#555' }} isConnectable={isConnectable} />
    </div>
  );
};

export default memo(SpaceNode);





