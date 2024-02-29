import { useEffect, useState } from 'react';
import HomePage from '@root/src/components/HomePage';
import MovePage from '@root/src/components/MovePage';

type Tab = 'home' | 'move' | 'damage' | 'settings';

export default function App() {
  useEffect(() => {
    console.log('tobethebest sidebar loaded');

    const handleMessage = event => {
      if (event.data && event.data.type === 'MOVESUGGESTION_CLICKED') {
        setToggled(true);
        handleTabChange('move');
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
      case 'move':
        return <MovePage />;
      case 'damage':
        return <div>Damage</div>;
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
            <li onClick={() => handleTabChange('move')}>
              <i className="fa fa-info-circle"></i>
              Move
            </li>
            <li onClick={() => handleTabChange('damage')}>
              <i className="fa fa-calculator"></i>
              Damage
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
