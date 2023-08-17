import React from 'react';

interface MainMenuProps {
    setNodes: (callback: (nodes: any[]) => any[]) => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ setNodes }) => {
    
    const handleSpaceCreation = () => {
        const newNode = {
            id: (Math.random() * 1000).toString(),
            type: 'input',
            data: { label: 'Space' },
            position: { x: 300, y: 100 },
        };
        setNodes((prevNodes) => [...prevNodes, newNode]);
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
  
    return (
      <div className="main-menu">
        <h2>Main Menu</h2>
        <button onClick={handleSpaceCreation}>Create Space</button><br></br>
        <button onClick={handleTrajectoryCreation}>Create Trajectory</button><br></br>
        <button onClick={handleTokenCreation}>Create Token</button><br></br>
        <button onClick={handleObjectCreation}>Create Object</button><br></br>
      </div>
    );
  }

export default MainMenu;
