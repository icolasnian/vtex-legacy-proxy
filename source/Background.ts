/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/no-unresolved */
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
  activateIcon: (tabId: number) => void;
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
    chrome.declarativeNetRequest.getDynamicRules((previousRules) => {
      const previousRuleIds = previousRules.map((rule) => rule.id);
      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: previousRuleIds,

        addRules: [],
      });
    });
  },

  activateIcon(tabId): void {
    chrome.action.setIcon({tabId, path: '/assets/icons/16-color.png'});
  },

  initListener() {
    const rulesWithId = proxy.rules.map((rule, ruleID) => {
      return {...rule, id: ruleID + 1};
    });

    const formattedRules = rulesWithId.map((rule) => {
      // @ts-expect-error
      delete rule.name;
      // @ts-expect-error
      delete rule.active;

      return {...rule};
    });

    chrome.declarativeNetRequest.getDynamicRules((previousRules) => {
      const previousRuleIds = previousRules.map((rule) => rule.id);
      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: previousRuleIds,
        // @ts-expect-error
        addRules: formattedRules,
      });
    });
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
  const proxyData = JSON.parse(changes.proxyData.newValue);
  const {stores} = proxyData;
  if (stores) {
    proxy.filterStores(stores);
  }
});

chrome.tabs.onUpdated.addListener(function (tabId, info) {
  if (info.status === 'complete' && proxy.rules.length > 0) {
    chrome.declarativeNetRequest.getMatchedRules({tabId}, function (data) {
      if (data.rulesMatchedInfo.length > 0) {
        proxy.activateIcon(tabId);
        const activeRules = data.rulesMatchedInfo;

        for (let i = 0; i < activeRules.length; i++) {
          /**
           * Active rules ids aren't the same as proxy.rules ids,
           * chrome doesn't accept id = 0
           */
          const activeRuleId = activeRules[i].rule.ruleId;

          const ruleName = proxy.rules[activeRuleId - 1].name;

          chrome.tabs.sendMessage(tabId, {name: ruleName});
        }
      }
    });
  }
});
