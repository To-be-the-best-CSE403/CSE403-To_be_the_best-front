import { useEffect, useState } from 'react';
import { PREFIX } from '@src/constants';
import { MESSAGES } from '@src/messages';
import HomePage from '@src/components/HomePage';
import BattlePage from '@src/components/BattlePage';
import TrainerPage from '@src/components/TrainerPage';

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

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const [toggled, setToggled] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const handleToggle = () => {
    setToggled(!toggled);
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  }

  const displayTab = (tab: Tab) => {
    switch (tab) {
      case 'home':
        return <HomePage />;
      case 'battle':
        return <BattlePage />;
      case 'trainer':
        return <TrainerPage />;
      case 'settings':
        return <div>Settings</div>;
    }
  }

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
  }

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
        { displayTab(activeTab) }
        { displayFooter() }
      </div>
    </>
  );
}
