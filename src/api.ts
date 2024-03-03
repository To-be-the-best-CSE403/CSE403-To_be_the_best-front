import { get } from 'http';
import Teams from './team';

// API endpoints
const API_BASE_URL = 'https://tobethebest.vercel.app/api';
const API_TEST_URL = `${API_BASE_URL}/test`;
export const API_ENDPOINTS = {
  TEAMBUILDER: `${API_BASE_URL}/teambuilder`,
  TEAMBUILDER_TEST: `${API_TEST_URL}/teambuilder`,
};

// API functions
export const createTeam = (archetype: string) => {
    const url = new URL(API_ENDPOINTS.TEAMBUILDER);
    url.searchParams.append('archetype', archetype);

    getTeam(archetype).then(data => {
        console.log('[ToBeTheBest] Team created:', data);

        const teamName = 'gen9ou]ToBeTheBest-' + archetype;
        const teamPacked = Teams.pack(data);
        const team = teamName.concat('|', teamPacked);
        console.log('[ToBeTheBest] Team packed:', team);

        const showdownTeams = localStorage.getItem('showdown_teams');
        localStorage.setItem('showdown_teams', showdownTeams ? showdownTeams.concat('\n', team) : team);

        window.location.href = 'https://play.pokemonshowdown.com/teambuilder';  // Refresh the page to show the new team
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

export const getTeam = (archetype: string) => {
  const url = new URL(API_ENDPOINTS.TEAMBUILDER);
  url.searchParams.append('archetype', archetype);

  return fetch(url).then(response => response.json());
}