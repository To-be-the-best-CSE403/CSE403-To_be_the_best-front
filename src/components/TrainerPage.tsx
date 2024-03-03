import { useState } from 'react';
import { getTeam } from '@src/api';
import { battleBot } from '@src/sim';

export default function TrainerPage() {
  const [archetype, setArchetype] = useState('HO');

  const onChallengeClick = () => {
    getTeam(archetype).then(team => {
      battleBot('Challenger', team);
    });
  };

  return (
    <div id="tobethebest-sidebar__container" data-testid="test-tobethebest-sidebar__container">
      <div id="tobethebest-sidebar-header" data-testid="test-tobethebest-sidebar-header">
        Trainer
      </div>
      <div
        id="tobethebest-sidebar-trainer"
        data-testid="test-tobethebest-sidebar-trainer"
        className="tobethebest-sidebar__component">
        <h2>Random Bot</h2>
        <label htmlFor="archetype">Select Your Team:</label>
        <select name="archetype" value={archetype} onChange={e => setArchetype(e.target.value)}>
          <option value="HO">Hyper Offense</option>
          <option value="Stall">Stall</option>
          <option value="BO">Bulky Offense</option>
          <option value="Balance">Balance</option>
          <option value="Weather">Weather</option>
        </select>
        <button onClick={onChallengeClick}>Challenge Bot</button>
      </div>
    </div>
  );
}
