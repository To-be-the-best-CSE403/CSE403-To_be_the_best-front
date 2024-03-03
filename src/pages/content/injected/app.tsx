import { useState } from 'react';
import { createTeam } from '@src/api';
import { MESSAGES } from '@src/messages';

export function TeambuilderApp() {
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

export function BattlesuggestionApp() {
  const doClick = () => {
    window.postMessage({ type: MESSAGES.BATTLESUGGESTION_OPEN }, '*'); 
  };

  return (
    <div id="battlesuggestion-container">
      <button id="battlesuggestion-button" className="button big" onClick={doClick}>
        Hint Moves
      </button>
    </div>
  );
}

export function TrainerApp() {
  const doClick = () => {
    window.postMessage({ type: MESSAGES.TRAINER_OPEN }, '*');
  };

  return (
    <p>
      <button id="trainer-button" className='button mainmenu2' onClick={doClick}>Trainer</button>
    </p>
  );
}
