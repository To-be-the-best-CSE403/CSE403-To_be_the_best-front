import { createRoot } from 'react-dom/client';
import App from '@pages/content/sidebar/app';
import { initInterception } from '@root/src/protocol/Connection';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';

refreshOnUpdate('pages/content');

const root = document.createElement('div');
root.id = 'tobethebest-root';

document.body.append(root);

initInterception();

createRoot(root).render(<App />);
