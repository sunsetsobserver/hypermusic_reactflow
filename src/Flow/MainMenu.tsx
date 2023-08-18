import React from 'react';

interface MainMenuProps {
    setNodes: (callback: (nodes: any[]) => any[]) => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ setNodes }) => {
        
    const handleDimensionCreation = () => {
        const newNode = {
            id: (Math.random() * 1000).toString(),
            type: 'dimension',
            position: { x: 250, y: 250 },
        };
        setNodes((prevNodes) => [...prevNodes, newNode]);
    }
    
    const handleSpaceCreation = () => {
        const newSpaceNode = {
            id: (Math.random() * 1000).toString(),
            type: 'space',
            position: { x: 150, y: 150 },
        };
        setNodes((prevNodes) => [...prevNodes, newSpaceNode]);
    }

    const handleSpaceConnectorCreation = () => {
        const newSpaceNode = {
            id: (Math.random() * 1000).toString(),
            type: 'default',
            data: { label: 'Space' },
            position: { x: 150, y: 150 },
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
        <button onClick={handleDimensionCreation}>Create Dimension</button><br></br>
        <button onClick={handleSpaceConnectorCreation}>Create Space Connector</button><br></br>
        <button onClick={handleTrajectoryCreation}>Create Trajectory</button><br></br>
        <button onClick={handleTokenCreation}>Create Token</button><br></br>
        <button onClick={handleObjectCreation}>Create Object</button><br></br>
        <button onClick={handlePerformativeTransactionCreation}>Create Performative Transaction</button><br></br>
        <button onClick={handleSpaceCreation}>Create Space (depreciated)</button><br></br>
      </div>
    );
  }

export default MainMenu;
