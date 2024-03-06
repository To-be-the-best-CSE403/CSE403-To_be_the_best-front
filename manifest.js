import fs from 'node:fs';
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

/**
 * After changing, please reload the extension at `chrome://extensions`
 * @type {chrome.runtime.ManifestV3}
 */
const manifest = {
  manifest_version: 3,
  default_locale: 'en',
  /**
   * if you want to support multiple languages, you can use the following reference
   * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Internationalization
   */
  name: '__MSG_extensionName__',
  version: packageJson.version,
  description: '__MSG_extensionDescription__',
  permissions: ['activeTab', 'storage', 'scripting', 'webNavigation'],
  icons: {
    128: 'tobethebest-128.png',
  },
  action: {
    default_popup: 'src/pages/popup/index.html',
    default_icon: 'tobethebest-32.png',
  },
  content_scripts: [
    {
      matches: ['https://play.pokemonshowdown.com/*'],
      js: ['src/pages/contentSidebar/index.js', 'src/pages/contentInjected/index.js'],
      css: ['assets/css/contentStyle<KEY>.chunk.css'],
     },
  ],
  web_accessible_resources: [
    {
      resources: ['src/pages/main/*', 'assets/js/*.js', 'assets/css/*.css', 'tobethebest-128.png', 'tobethebest-32.png'],
      matches: ['https://play.pokemonshowdown.com/*'],
    },
  ],
  browser_specific_settings: {
    gecko: {
      id: "tobethebest.team@gmail.com"
    }
  }
};

export default manifest;
