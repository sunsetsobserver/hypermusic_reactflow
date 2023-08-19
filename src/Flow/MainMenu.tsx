//MainMenu.tsx
import React from 'react';

interface MainMenuProps {
    setNodes: (callback: (nodes: any[]) => any[]) => void;
    handleDimensionChange: (dimensionNodeId: string, dimensionName: string, dimensionValues: string) => void;
}


const MainMenu: React.FC<MainMenuProps> = ({ setNodes, handleDimensionChange }) => {
        
    const handleAddDimension = () => {
        const newDimensionNode = {
            id: (Math.random() * 1000).toString(),
            type: 'dimension',
            position: { x: 0, y: 0 },
            data: { dimensionName: 'DefaultName', dimensionValues: '[]', onChange: handleDimensionChange }
        };
        setNodes((ns) => ns.concat(newDimensionNode));
    };
    
    const handleSpaceCreation = () => {
        const newSpaceNode = {
            id: (Math.random() * 1000).toString(),
            type: 'space',
            position: { x: 150, y: 150 },
            data: { dimensions: {} }  
        };
        setNodes((prevNodes) => [...prevNodes, newSpaceNode]);
    }

    const handleTrajectoryCreation = () => {
        const newNode = {
            id: (Math.random() * 1000).toString(),
            type: 'default',
            data: { label: 'Trajectory' },
            position: { x: 300, y: 100 },
        };
        setNodes((prevNodes) => [...prevNodes, newNode]);
    }

    const handleTokenCreation = () => {
        const newNode = {
            id: (Math.random() * 1000).toString(),
            type: 'default',
            data: { label: 'Token' },
            position: { x: 300, y: 100 },
        };
        setNodes((prevNodes) => [...prevNodes, newNode]);
    }

    const handleObjectCreation = () => {
        const newNode = {
            id: (Math.random() * 1000).toString(),
            type: 'default',
            data: { label: 'Object' },
            position: { x: 100, y: 100 },
        };
        setNodes((prevNodes) => [...prevNodes, newNode]);
    }

    const handlePerformativeTransactionCreation = () => {
        const newNode = {
            id: (Math.random() * 1000).toString(),
            type: 'default',
            data: { label: 'Performative Transaction' },
            position: { x: 100, y: 100 },
        };
        setNodes((prevNodes) => [...prevNodes, newNode]);
    }

    return (
      <div className="main-menu">
        <h2>Main Menu</h2>
        <button onClick={handleAddDimension}>Create Dimension</button><br></br>
        <button onClick={handleSpaceCreation}>Create Space</button><br></br>
        <button onClick={handleTrajectoryCreation}>Create Trajectory</button><br></br>
        <button onClick={handleTokenCreation}>Create Token</button><br></br>
        <button onClick={handleObjectCreation}>Create Object</button><br></br>
        <button onClick={handlePerformativeTransactionCreation}>Create Performative Transaction</button><br></br>
      </div>
    );
  }

export default MainMenu;
