import { API_ENDPOINTS } from '@root/src/api';
import { useEffect } from 'react';
import { Teams } from '@pkmn/sim';

export default function App() {
  useEffect(() => {
    console.log('tobethebest teampane injected');
  }, []);

  const doCreateTeamClick = () => {
    fetch(API_ENDPOINTS.TEAMBUILDER_TEST)
      .then(response => response.json())
      .then(data => {
        console.log('[ToBeTheBest] Team created:', data);

        const teamName = 'gen9ou]ToBeTheBest';
        const teamPacked = Teams.pack(data);
        const team = teamName.concat('|', teamPacked);
        console.log('[ToBeTheBest] Team packed:', team);

        const showdownTeams = localStorage.getItem('showdown_teams');
        localStorage.setItem('showdown_teams', showdownTeams ? showdownTeams.concat('\n', team) : team);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div id="tobethebest-teampane-container">
      <h2>ToBeTheBest</h2>
      <button className="big button" onClick={doCreateTeamClick}>
        Create Best Team
      </button>
    </div>
  );
}
