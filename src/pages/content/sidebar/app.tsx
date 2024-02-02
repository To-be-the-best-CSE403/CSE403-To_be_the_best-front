import { useEffect, useState } from 'react';

export default function App() {
  useEffect(() => {
    console.log('tobethebest sidebar loaded');
  }, []);

  const [toggled, setToggled] = useState(false);

  const handleToggle = () => {
    setToggled(!toggled);
  }

  return (
    <>
      <div id="tobethebest-toggle" data-testid="test-tobethebest-toggle" className={toggled ? '' : 'active'} onMouseEnter={handleToggle}>
        <p id="tobethebest-toggle__text">ToBeTheBest</p>
      </div>
      <div id="tobethebest-sidebar" data-testid="test-tobethebest-sidebar" className={toggled ? 'active' : ''} onMouseLeave={handleToggle}>
        <div id="tobethebest-sidebar__container" data-testid="test-tobethebest-sidebar__container">
            <div id="tobethebest-sidebar-header" data-testid="test-tobethebest-sidebar-header" className="tobethebest-sidebar__component">
                <h1>ToBeTheBest</h1>
            </div>
            <div id="tobethebest-sidebar-teambuilder" data-testid="test-tobethebest-sidebar-teambuilder" className="tobethebest-sidebar__component">
                <h2>Team Builder</h2>
                <button id="tobethebest-teambuilder-button">Create Team</button>
            </div>
            <div id="tobethebest-sidebar-resources" data-testid="test-tobethebest-sidebar-resources" className="tobethebest-sidebar__component">
                <h2>Resources</h2>
                <button id="tobethebest-website-button">Website</button>
                <button id="tobethebest-wiki-button">Wiki</button>
                <button id="tobethebest-github-button">Github</button>
            </div>
        </div>
      </div>
    </>
  )
}
