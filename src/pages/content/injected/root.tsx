import { createRoot } from 'react-dom/client';
import App from '@pages/content/injected/app';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';

refreshOnUpdate('pages/content');

let root = null;

const createTeampane = (teampane: Element) => {
  root = document.createElement('div');
  root.id = 'tobethebest-teampane-root';
  teampane.appendChild(root);

  createRoot(root).render(<App />);
  console.log('tobethebest create teampane');
};

const observer = new MutationObserver(mutations => {
  const teampane = document.getElementsByClassName('teampane')[0];
  if (teampane) {
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length) {
        root = document.getElementById('tobethebest-teampane-root');
        if (!root) {
          createTeampane(teampane);
        }
      }
    });
  }
});

observer.observe(document.body, { childList: true, subtree: true });
