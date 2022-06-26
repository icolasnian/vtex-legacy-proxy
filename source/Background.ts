/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/no-unresolved */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable func-names */
// @ts-nocheck
import {IRule, IStore} from './components/ProxyContextProvider';

interface IProxy {
  rules: IRule[];
  filterStores: (stores: IStore[]) => void;
  filterRules: (stores: IStore[]) => void;
  killListener: () => void;
  initListener: () => void;
  intercept: (
    details: chrome.webRequest.WebRequestBodyDetails
  ) => {redirectUrl: string} | undefined;
  enableIcon: (tabId: number) => void;
}

const proxy: IProxy = {
  rules: [],
  filterStores(stores) {
    if (stores.length === 0) {
      proxy.killListener();
      return;
    }

    const filteredStores = stores.filter(
      (store) => store.active && store.rules.length > 0
    );

    if (filteredStores.length === 0) {
      proxy.killListener();
      return;
    }

    proxy.filterRules(filteredStores);
  },

  filterRules(filteredStores): void {
    proxy.rules = []; // otherwise overlaps rules

    for (let i = 0; i < filteredStores.length; i++) {
      const {rules} = filteredStores[i];

      for (let j = 0; j < rules.length; j++) {
        const isActiveRule = rules[j].active;

        if (isActiveRule) {
          proxy.rules.push(rules[j]);
        }
      }
    }

    if (proxy.rules.length > 0) {
      proxy.initListener();
    } else {
      proxy.killListener();
    }
  },

  killListener(): void {
    proxy.rules = [];
    chrome.webRequest.onBeforeRequest.removeListener(
      proxy.intercept as (
        details: chrome.webRequest.WebRequestBodyDetails
      ) => void | chrome.webRequest.BlockingResponse
    );
  },

  enableIcon(tabId): void {
    chrome.action.setIcon({tabId, path: '/assets/icons/16-color.png'});
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- chrome methods expects different types for the same function
  intercept(details: chrome.webRequest.WebRequestBodyDetails): any {
    const {tabId} = details;
    for (let i = 0; i < proxy.rules.length; i++) {
      const matchedRule = details.url.includes(proxy.rules[i].urlFrom);

      if (matchedRule) {
        // proxy.enableIcon(tabId);

        setTimeout(function () {
          chrome.tabs.sendMessage(tabId, {name: proxy.rules[i].name});
        }, 2000);

        return {redirectUrl: proxy.rules[i].urlTo};
      }
    }
  },

  initListener() {
    chrome.webRequest.onBeforeRequest.addListener(
      proxy.intercept as (
        details: chrome.webRequest.WebRequestBodyDetails
      ) => void | chrome.webRequest.BlockingResponse,
      {
        urls: ['<all_urls>'],
        types: ['main_frame', 'script', 'stylesheet'],
      }
    );
  },
};

chrome.storage.local.get('proxyData', function (result) {
  if (result && result.proxyData && result.proxyData !== '') {
    const proxyData = JSON.parse(result.proxyData);
    const {stores} = proxyData;

    if (stores) {
      // proxy.filterStores(stores);
      console.log(stores);
    }
  }
});

chrome.storage.onChanged.addListener(function (changes) {
  // proxy.killListener();
  const proxyData = JSON.parse(changes.proxyData.newValue);
  const {stores} = proxyData;
  if (stores) {
    console.log(stores);
    // proxy.filterStores(stores);
  }
});

// // chrome.declarativeNetRequest.updateDynamicRules({
// //   addRules: [
// //     {
// //       id: 1001,
// //       priority: 1,
// //       action: {
// //         type: 'redirect',
// //         redirect: {
// //           url: 'https://www.google.com',
// //         },
// //       },
// //       condition: {
// //         urlFilter: 'https://www.twitter.com',
// //         resourceTypes: [
// //           'csp_report',
// //           'font',
// //           'image',
// //           'main_frame',
// //           'media',
// //           'object',
// //           'other',
// //           'ping',
// //           'script',
// //           'stylesheet',
// //           'sub_frame',
// //           'webbundle',
// //           'websocket',
// //           'webtransport',
// //           'xmlhttprequest',
// //         ],
// //       },
// //     },
// //   ],
// //   removeRuleIds: [1001],
// // });
