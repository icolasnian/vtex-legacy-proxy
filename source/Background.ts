/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable func-names */
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
    chrome.browserAction.setIcon({tabId, path: 'assets/icons/16-color.png'});
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- chrome methods expects different types for the same function
  intercept(details: chrome.webRequest.WebRequestBodyDetails): any {
    const {tabId} = details;
    for (let i = 0; i < proxy.rules.length; i++) {
      const matchedRule = details.url.includes(proxy.rules[i].urlFrom);

      if (matchedRule) {
        proxy.enableIcon(tabId);

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
      },
      ['blocking']
    );
  },
};

chrome.storage.local.get('proxyData', function (result) {
  if (result && result.proxyData && result.proxyData !== '') {
    const proxyData = JSON.parse(result.proxyData);
    const {stores} = proxyData;

    if (stores) {
      proxy.filterStores(stores);
    }
  }
});

chrome.storage.onChanged.addListener(function (changes) {
  proxy.killListener();
  const proxyData = JSON.parse(changes.proxyData.newValue);
  const {stores} = proxyData;
  if (stores) {
    proxy.filterStores(stores);
  }
});
