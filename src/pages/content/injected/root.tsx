import { createRoot } from 'react-dom/client';
import { TeambuilderApp, MovesuggestionApp } from '@pages/content/injected/app';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import { ReactNode } from 'react';

refreshOnUpdate('pages/content');

const TEAMBUILDER_PARENT = 'teampane';
const TEAMBUILDER_ROOT = 'tobethebest-teampane';

const MOVESUGGESTION_PARENT = 'movecontrols';
const MOVESUGGESTION_ROOT = 'movesuggestion';

const injectInto = (parent: Element, rootId: string, app: ReactNode) => {
  if (document.getElementById(rootId)) {
    return;
  }
  const root = document.createElement('div');
  root.id = rootId;
  parent.appendChild(root);

  createRoot(root).render(app);
  console.log(`tobethebest create ${rootId}`);
};

const observer = new MutationObserver(mutations => {
  const teampane = document.getElementsByClassName(TEAMBUILDER_PARENT)[0];
  if (teampane) {
    injectInto(teampane, TEAMBUILDER_ROOT, <TeambuilderApp />);
  }

  const movecontrols = document.getElementsByClassName(MOVESUGGESTION_PARENT)[0];
  if (movecontrols) {
    injectInto(movecontrols, MOVESUGGESTION_ROOT, <MovesuggestionApp />);
  }
});

observer.observe(document.body, { childList: true, subtree: true });
