import React, {FC, createContext, useEffect, useState, ReactNode} from 'react';
// eslint-disable-next-line import/no-cycle
import {setLocalStorage, readLocalStorage} from '../../utils/storage.util';

export interface IRule {
  active: boolean;
  name: string;
  urlFrom: string;
  urlTo: string;
}

export interface IStore {
  vendor: string;
  admin: string;
  rules: IRule[];
  active: boolean;
}

interface IProxyContextProvider {
  children: ReactNode;
}

interface ICurrentStoreInfo {
  storeID: number;
  store: IStore;
}
interface ICurrentRuleInfo {
  storeID: number;
  ruleID: number;
  rule: IRule;
}

type SearchQuery = string;

interface IProxyData {
  stores: IStore[];
  isCreateStoreModalOpen: boolean;
  isUpdateStoreModalOpen: boolean;
  isCreateRuleModalOpen: boolean;
  isUpdateRuleModalOpen: boolean;
  currentStoreInfo: ICurrentStoreInfo;
  currentRuleInfo: ICurrentRuleInfo;
}

interface IProxyContext extends IProxyData {
  storesToShow: IStore[];
  updateStoresToShow: (searchQuery: SearchQuery) => void;
  createStore: ({admin, vendor, rules, active}: IStore) => void;
  removeStore: (storeID: number) => void;
  updateStore: (storeID: number, {vendor, admin}: IStore) => void;
  createRule: (storeID: number, rule: IRule) => void;
  removeRule: (storeID: number, ruleID: number) => void;
  updateRule: (
    storeID: number,
    ruleID: number,
    {active, urlFrom, urlTo}: IRule
  ) => void;
  setShowCreateStoreModal: (condition: boolean) => void;
  setShowUpdateStoreModal: (condition: boolean) => void;
  setShowCreateRuleModal: (condition: boolean) => void;
  setShowUpdateRuleModal: (condition: boolean) => void;
  updateCurrentStoreInfo: (storeID: number) => void;
  updateCurrentRuleInfo: (storeID: number, ruleID: number) => void;
}

const ProxyContext = createContext<IProxyContext>({} as IProxyContext);

const ProxyContextProvider: FC<IProxyContextProvider> = ({children}) => {
  const [proxyData, setProxyData] = useState<IProxyData>({
    isCreateRuleModalOpen: false,
    isUpdateRuleModalOpen: false,
    isUpdateStoreModalOpen: false,
    isCreateStoreModalOpen: false,
    stores: [],
    currentRuleInfo: {} as ICurrentRuleInfo,
    currentStoreInfo: {} as ICurrentStoreInfo,
  });
  const [storesToShow, setStoresToShow] = useState<IStore[]>(proxyData.stores);

  useEffect(() => {
    const getProxyData = async (): Promise<void> => {
      try {
        const storedProxyData = await readLocalStorage('proxyData');
        setProxyData(storedProxyData as IProxyData);
      } catch (err) {
        console.log(err);
      }
    };

    getProxyData();
  }, []);

  useEffect(() => {
    setLocalStorage('proxyData', proxyData);
    setStoresToShow(proxyData.stores);
  }, [proxyData]);

  const updateStoresToShow = (searchQuery: SearchQuery): void => {
    const updatedStoresToShow = proxyData?.stores?.filter((store) =>
      store.vendor.includes(searchQuery)
    );
    setStoresToShow(updatedStoresToShow);
  };

  const updateStore = (
    storeID: number,
    {vendor, admin, rules, active}: IStore
  ): void => {
    setProxyData((previousProxyData) => ({
      ...previousProxyData,
      stores: previousProxyData.stores.map((store, storeIndex) => {
        return storeIndex === storeID
          ? {
              ...store,
              vendor,
              admin,
              rules,
              active,
            }
          : store;
      }),
    }));
  };

  const createStore = (store: IStore): void => {
    setProxyData((previousProxyData) => ({
      ...previousProxyData,
      stores: [...previousProxyData.stores, store],
    }));
  };

  const removeStore = (storeID: number): void => {
    setProxyData((previousProxyData) => ({
      ...previousProxyData,
      stores: previousProxyData.stores.filter(
        (_store, storeIndex) => storeIndex !== storeID
      ),
    }));
  };

  const createRule = (storeID: number, rule: IRule): void => {
    setProxyData((previousProxyData) => ({
      ...previousProxyData,
      stores: [
        ...previousProxyData.stores.map((store, storeIndex) => {
          return storeIndex === storeID
            ? {...store, rules: [...store.rules, rule]}
            : store;
        }),
      ],
    }));
  };

  const removeRule = (storeID: number, ruleID: number): void => {
    setProxyData((previousProxyData) => ({
      ...previousProxyData,
      stores: [
        ...previousProxyData.stores.map((store, storeIndex) => {
          return storeIndex === storeID
            ? {
                ...store,
                rules: [
                  ...store.rules.filter(
                    (_rule, ruleIndex) => ruleIndex !== ruleID
                  ),
                ],
              }
            : store;
        }),
      ],
    }));
  };

  const updateRule = (
    storeID: number,
    ruleID: number,
    {active, name, urlFrom, urlTo}: IRule
  ): void => {
    setProxyData((previousProxyData) => ({
      ...previousProxyData,
      stores: [
        ...previousProxyData.stores.map((store, storeIndex) => {
          return storeIndex === storeID
            ? {
                ...store,
                rules: [
                  ...store.rules.map((rule, ruleIndex) => {
                    return ruleIndex === ruleID
                      ? {
                          ...rule,
                          name,
                          active,
                          urlFrom,
                          urlTo,
                        }
                      : rule;
                  }),
                ],
              }
            : store;
        }),
      ],
    }));
  };

  const setShowCreateStoreModal = (condition: boolean): void => {
    setProxyData((previousProxyData) => ({
      ...previousProxyData,
      isCreateStoreModalOpen: condition,
    }));
  };
  const setShowUpdateStoreModal = (condition: boolean): void => {
    setProxyData((previousProxyData) => ({
      ...previousProxyData,
      isUpdateStoreModalOpen: condition,
    }));
  };
  const setShowCreateRuleModal = (condition: boolean): void => {
    setProxyData((previousProxyData) => ({
      ...previousProxyData,
      isCreateRuleModalOpen: condition,
    }));
  };

  const setShowUpdateRuleModal = (condition: boolean): void => {
    setProxyData((previousProxyData) => ({
      ...previousProxyData,
      isUpdateRuleModalOpen: condition,
    }));
  };

  const updateCurrentStoreInfo = (storeID: number): void => {
    const currentStore: IStore = proxyData.stores[storeID];

    setProxyData((previousProxyData) => ({
      ...previousProxyData,
      currentStoreInfo: {storeID, store: currentStore},
    }));
  };

  const updateCurrentRuleInfo = (storeID: number, ruleID: number): void => {
    const currentRule: IRule = proxyData.stores[storeID].rules[ruleID];

    setProxyData((previousProxyData) => ({
      ...previousProxyData,
      currentRuleInfo: {storeID, ruleID, rule: currentRule},
    }));
  };

  const ProxyContextValues = {
    ...proxyData,
    updateStoresToShow,
    createStore,
    removeStore,
    updateStore,
    createRule,
    removeRule,
    updateRule,
    storesToShow,
    setShowCreateStoreModal,
    setShowUpdateStoreModal,
    setShowCreateRuleModal,
    setShowUpdateRuleModal,
    updateCurrentStoreInfo,
    updateCurrentRuleInfo,
  };

  return (
    <ProxyContext.Provider value={ProxyContextValues}>
      {children}
    </ProxyContext.Provider>
  );
};

export {ProxyContextProvider, ProxyContext};
