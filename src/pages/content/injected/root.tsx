import { createRoot } from 'react-dom/client';
import App from '@pages/content/injected/app';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import browser from 'webextension-polyfill';

refreshOnUpdate('pages/content');

const createTeampane = () => {    
    const teampane = document.getElementsByClassName('teampane')[0];

    if (teampane) {
        let root = document.getElementById('tobethebest-teampane-root');
        if (!root) {
            root = document.createElement('div');
            root.id = 'tobethebest-teampane-root';
            teampane.appendChild(root);
        }
        
        createRoot(root).render(<App />);
    }
};

// Initialize the teampane when the page loads
createTeampane();

// Initialize the teampane when url changes to teambuilder but does not reload the page
browser.runtime.onMessage.addListener(
  function(request) {
    // listen for messages sent from background.js
    if (request.message === 'teambuilder') {
        console.log('injected script: received message', request.message);
        createTeampane();
    }
});