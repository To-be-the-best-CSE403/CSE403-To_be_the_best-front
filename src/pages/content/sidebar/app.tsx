import { useEffect, useState } from 'react';
import { createTeam } from '@src/api';

export default function App() {
  useEffect(() => {
    console.log('tobethebest sidebar loaded');
  }, []);

  const [archetype, setArchetype] = useState('HO');
  const [toggled, setToggled] = useState(false);
  const [selectActive, setSelectActive] = useState(false); // State to track select dropdown focus

  const handleToggle = () => {
    if (!selectActive) {
      setToggled(!toggled);
    }
  };

  return (
    <>
      <div
        id="tobethebest-toggle"
        data-testid="test-tobethebest-toggle"
        className={toggled ? '' : 'active'}
        onMouseEnter={handleToggle}>
        <p id="tobethebest-toggle__text">ToBeTheBest</p>
      </div>
      <div
        id="tobethebest-sidebar"
        data-testid="test-tobethebest-sidebar"
        className={toggled ? 'active' : ''}
        style={{ background: window.getComputedStyle(document.body).getPropertyValue('background') }}
        onMouseLeave={handleToggle}>
        <div id="tobethebest-sidebar__container" data-testid="test-tobethebest-sidebar__container">
          <div
            id="tobethebest-sidebar-header"
            data-testid="test-tobethebest-sidebar-header"
            className="tobethebest-sidebar__component">
            <h1>ToBeTheBest</h1>
          </div>
          <div
            id="tobethebest-sidebar-teambuilder"
            data-testid="test-tobethebest-sidebar-teambuilder"
            className="tobethebest-sidebar__component">
            <h2>Team Builder</h2>
            <label htmlFor="archetype">Select Team Archetype:</label>
            <select
              name="archetype"
              value={archetype}
              onFocus={() => setSelectActive(true)}
              onChange={e => {
                setArchetype(e.target.value);
                setSelectActive(false);
                e.currentTarget.blur();
              }}>
              <option value="HO">Hyper Offense</option>
              <option value="Stall">Stall</option>
              <option value="BO">Bulky Offense</option>
              <option value="Balance">Balance</option>
              <option value="Weather">Weather</option>
            </select>
            <button
              onClick={() => {
                createTeam(archetype);
              }}>
              Create Team
            </button>
          </div>
          <div
            id="tobethebest-sidebar-resources"
            data-testid="test-tobethebest-sidebar-resources"
            className="tobethebest-sidebar__component">
            <h2>Resources</h2>
            <button onClick={() => window.open('https://tobethebest.vercel.app', '_blank')}>Website</button>
            <button onClick={() => window.open('https://tobethebest.vercel.app/dashboard/getting-started', '_blank')}>
              Wiki
            </button>
            <button
              onClick={() =>
                window.open('https://github.com/To-be-the-best-CSE403/CSE403-To_be_the_best-front', '_blank')
              }>
              Github
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
