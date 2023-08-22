
function MainMenu ({ handleSpaceCreation }) {
        
    return (
      <div className="main-menu">
        <h2>Main Menu</h2>
        <button>Create Dimension</button><br></br> {/*  ADD ONCLICK EVENT */}
        <button onClick={handleSpaceCreation}>Create Space</button><br></br>
      </div>
    );
  }

export default MainMenu;