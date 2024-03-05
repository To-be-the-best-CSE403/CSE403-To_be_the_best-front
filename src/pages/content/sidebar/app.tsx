import { useEffect, useState } from 'react';
import { Pokemon, Move } from '@smogon/calc';
import { PREFIX, GEN } from '@src/constants';
import { MESSAGES } from '@src/messages';
import HomePage from '@src/components/HomePage';
import BattlePage from '@src/components/BattlePage';
import TrainerPage from '@src/components/TrainerPage';
import SettingsPage from '@root/src/components/SettingsPage';

type Tab = 'home' | 'battle' | 'trainer' | 'settings';

export default function App() {
  useEffect(() => {
    console.log(`${PREFIX} Loading sidebar`);

    const handleMessage = event => {
      if (!event.data) {
        return;
      }
      switch (event.data.type) {
        case MESSAGES.BATTLESUGGESTION_OPEN:
          setToggled(true);
          handleTabChange('battle');
          break;

        case MESSAGES.TRAINER_OPEN:
          setToggled(true);
          handleTabChange('trainer');
          break;
      }
    };

    window.addEventListener('message', handleMessage);
    window.addEventListener('message', handleBattleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const [toggled, setToggled] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [attacker, setAttacker] = useState<Pokemon | undefined>(undefined);
  const [defender, setDefender] = useState<Pokemon | undefined>(undefined);
  const [moves, setMoves] = useState<Move[] | undefined>(undefined);

  const handleToggle = () => {
    setToggled(!toggled);
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  };

  const handleBattleMessage = (event: MessageEvent) => {
    if (!event.data || event.data.type !== MESSAGES.FROM_BOT) {
      return;
    }

    const message = event.data.message;
    const messageLines = message.split('\n');
    const regexSwitch = /^\|switch\|(p1a|p2a):.*/gm;
    const regexRequest = /^\|request\|.*/gm;

    messageLines.forEach(line => {
      if (line.match(regexSwitch)) {
        const parts = line.split('|');
        const [player, pokemonName] = parts[2].split(': ');
        console.log(`${PREFIX} [Battle] Switch: ${player}, ${pokemonName}`);
        const pokemon = new Pokemon(GEN, pokemonName, {});
        if (player === 'p1a') {
          setAttacker(pokemon);
        } else if (player === 'p2a') {
          setDefender(pokemon);
        }
      } else if (line.match(regexRequest)) {
        const request = JSON.parse(line.split('|')[2]);
        console.log(`${PREFIX} [Battle] Request: ${JSON.stringify(request)}`);
        const moveNames = request.active[0].moves.map(moveJson => moveJson.move);
        console.log(`${PREFIX} [Battle] Moves: ${moveNames}`);
        const moves = moveNames.map(moveName => new Move(GEN, moveName));
        setMoves(moves);
      }
    });
  };

  const displayTab = (tab: Tab) => {
    switch (tab) {
      case 'home':
        return <HomePage />;
      case 'battle':
        return <BattlePage attacker={attacker} defender={defender} moves={moves} />;
      case 'trainer':
        return <TrainerPage />;
      case 'settings':
        return <SettingsPage />; 
    }
  };

  const displayFooter = () => {
    return (
      <div id="tobethebest-sidebar-footer">
        <div id="tobethebest-sidebar-tabs">
          <ul>
            <li onClick={() => handleTabChange('home')}>
              <i className="fa fa-home"></i>
              Home
            </li>
            <li onClick={() => handleTabChange('battle')}>
              <i className="fa fa-calculator"></i>
              Battle
            </li>
            <li onClick={() => handleTabChange('trainer')}>
              <i className="fa fa-info"></i>
              Trainer
            </li>
            <li onClick={() => handleTabChange('settings')}>
              <i className="fa fa-cogs"></i>
              Settings
            </li>
          </ul>
        </div>
      </div>
    );
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
        style={{ background: window.getComputedStyle(document.body).getPropertyValue('background') }}>
        <button id="tobethebest-sidebar__close" onClick={handleToggle}>
          <i className="fa fa-times"></i>
        </button>
        {displayTab(activeTab)}
        {displayFooter()}
      </div>
    </>
  );
}
