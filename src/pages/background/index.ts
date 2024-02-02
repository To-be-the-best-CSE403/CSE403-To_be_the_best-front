import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import browser from 'webextension-polyfill';

reloadOnUpdate('pages/background');
browser.tabs.onUpdated.addListener(
  function(tabId, changeInfo) {
    if (changeInfo.url === 'https://play.pokemonshowdown.com/teambuilder') {
        console.log('background script: sending message teambuilder');
        browser.tabs.sendMessage( tabId, {
            message: 'teambuilder',
            url: changeInfo.url
        })
    }
  }
);

console.log('background loaded');