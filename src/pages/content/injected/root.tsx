import { createRoot } from 'react-dom/client';
import { ReactNode } from 'react';
import { TeambuilderApp, BattlesuggestionApp, TrainerApp } from '@pages/content/injected/app';
import { PREFIX } from '@src/constants';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import browser from 'webextension-polyfill';

refreshOnUpdate('pages/content');

const TEAMBUILDER_PARENT = 'teampane';
const TEAMBUILDER_ROOT = 'tobethebest-teampane';

const MOVESUGGESTION_PARENT = 'movecontrols';
const MOVESUGGESTION_ROOT = 'movesuggestion';

const TRAINER_PARENT = 'mainmenu';
const TRAINER_ROOT = 'tobethebest-trainer';

const inject = (parent: Element, element: HTMLElement) => {
  if (parent.contains(element)) {
    return;
  }
  parent.appendChild(element);
  console.log(`${PREFIX} Injecting ${element.id}`);
};

const injectReact = (parent: Element, app: ReactNode, id: string, className: string = '') => {
  if (document.getElementById(id)) {
    return;
  }
  const root = document.createElement('div');
  root.id = id;
  if (className) {
    root.className = className;
  }
  createRoot(root).render(app);

  inject(parent, root);
};

const observer = new MutationObserver(mutations => {
  const teampane = document.getElementsByClassName(TEAMBUILDER_PARENT)[0];
  if (teampane) {
    injectReact(teampane, <TeambuilderApp />, TEAMBUILDER_ROOT);
  }

  const movecontrols = document.getElementsByClassName(MOVESUGGESTION_PARENT)[0];
  if (movecontrols) {
    injectReact(movecontrols, <BattlesuggestionApp />, MOVESUGGESTION_ROOT);
  }

  const mainmenu = document.getElementsByClassName(TRAINER_PARENT)[0];
  if (mainmenu) {
    injectReact(mainmenu, <TrainerApp />, TRAINER_ROOT, 'menugroup');
  }
});

observer.observe(document.body, { childList: true, subtree: true });

if (!document.getElementById('tobethebest-script')) {
  const script = document.createElement('script');
  const url = browser.runtime.getURL('src/pages/main/index.js');
  const extensionId = url.split('/')[2];
  script.src = url;
  script.id = 'tobethebest-script';
  script.setAttribute('async', 'true');
  script.setAttribute('data-extension-id', extensionId);
  
  inject(document.body, script);
}

