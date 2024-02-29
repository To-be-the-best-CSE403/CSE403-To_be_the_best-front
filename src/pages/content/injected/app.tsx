import { useEffect, useState } from 'react';
import { createTeam } from '@src/api';

export function TeambuilderApp() {
  useEffect(() => {
    console.log('tobethebest teampane injected');
  }, []);

  const doCreateTeamClick = () => {
    createTeam(archetype);
  };

  const [archetype, setArchetype] = useState('HO'); // Default HO (Hyper Offense)

  return (
    <div id="tobethebest-teampane-container">
      <h2>ToBeTheBest</h2>
      <p>
        <label className="label" htmlFor="archetype">
          Select Team Archetype:
        </label>
        <select
          className="select formatselect"
          name="archetype"
          value={archetype}
          onChange={e => setArchetype(e.target.value)}>
          <option value="HO">Hyper Offense</option>
          <option value="Stall">Stall</option>
          <option value="BO">Bulky Offense</option>
          <option value="Balance">Balance</option>
          <option value="Weather">Weather</option>
        </select>
      </p>
      <button className="big button" onClick={doCreateTeamClick}>
        Create Best Team
      </button>
    </div>
  );
}

export function MovesuggestionApp() {
  useEffect(() => {
    console.log('tobethebest movesuggestion injected');
  }, []);

  const doMoveSuggestionClick = () => {
    console.log('tobethebest movesuggestion clicked');
    window.postMessage({ type: 'MOVESUGGESTION_CLICKED' }, '*'); 
  };

  return (
    <div id="movesuggestion-container">
      <button id="movesuggestion-button" className="button big" onClick={doMoveSuggestionClick}>
        Hint Moves
      </button>
    </div>
  );
}
