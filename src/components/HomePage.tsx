import { useState } from 'react';
import { createTeam } from '@src/api';

export default function HomePage() {
  const [archetype, setArchetype] = useState('HO');

  return (
    <div id="tobethebest-sidebar__container" data-testid="test-tobethebest-sidebar__container">
      <div id="tobethebest-sidebar-header" data-testid="test-tobethebest-sidebar-header">
        ToBeTheBest
      </div>
      <div
        id="tobethebest-sidebar-teambuilder"
        data-testid="test-tobethebest-sidebar-teambuilder"
        className="tobethebest-sidebar__component">
        <h2>Team Builder</h2>
        <label htmlFor="archetype">Select Team Archetype:</label>
        <select name="archetype" value={archetype} onChange={e => setArchetype(e.target.value)}>
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
          onClick={() => window.open('https://github.com/To-be-the-best-CSE403/CSE403-To_be_the_best-front', '_blank')}>
          Github
        </button>
      </div>
      <div id="tobethebest-sidebar-footer">
        <div id="tobethebest-sidebar-tabs">
          <ul>
            <li>
              <i className="fa fa-home"></i>
              Home
            </li>
            <li>
              <i className="fa fa-info-circle"></i>
              Move
            </li>
            <li>
              <i className="fa fa-calculator"></i>
              Damage
            </li>
            <li>
              <i className="fa fa-cogs"></i>
              Settings
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
