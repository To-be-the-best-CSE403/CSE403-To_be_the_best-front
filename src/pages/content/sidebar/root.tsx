import { createRoot } from 'react-dom/client';
import App from '@pages/content/sidebar/app';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import injectedStyle from './app.css?inline';

refreshOnUpdate('pages/content');

const root = document.createElement('div');
root.id = 'tobethebest-root';

document.body.append(root);

const rootIntoShadow = document.createElement('div');
rootIntoShadow.id = 'tobethebest-shadow-root';

const shadowRoot = root.attachShadow({ mode: 'open' });
shadowRoot.appendChild(rootIntoShadow);

/** Inject styles into shadow dom */
const styleElement = document.createElement('style');
styleElement.innerHTML = injectedStyle;
shadowRoot.appendChild(styleElement);

createRoot(rootIntoShadow).render(<App />);
