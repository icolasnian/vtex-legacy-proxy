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

interface IStoresContextProvider {
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

interface IStoresContextValues {
  stores: IStore[];
  storesToShow: IStore[] /* Search component  */;
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
  isCreateStoreModalOpen: boolean;
  isUpdateStoreModalOpen: boolean;
  isCreateRuleModalOpen: boolean;
  isUpdateRuleModalOpen: boolean;
  setShowCreateStoreModal: (condition: boolean) => void;
  setShowUpdateStoreModal: (condition: boolean) => void;
  setShowCreateRuleModal: (condition: boolean) => void;
  setShowUpdateRuleModal: (condition: boolean) => void;
  currentStoreInfo: ICurrentStoreInfo;
  updateCurrentStoreInfo: (storeID: number) => void;
  currentRuleInfo: ICurrentRuleInfo;
  updateCurrentRuleInfo: (storeID: number, ruleID: number) => void;
}

const StoresContext = createContext<IStoresContextValues>(
  {} as IStoresContextValues
);

const StoresContextProvider: FC<IStoresContextProvider> = ({children}) => {
  const [stores, setStores] = useState<IStore[]>([] as IStore[]);
  const [storesToShow, setStoresToShow] = useState<IStore[]>(stores);
  const [isCreateStoreModalOpen, setCreateStoreModalOpen] =
    useState<boolean>(false);
  const [isUpdateStoreModalOpen, setUpdateStoreModalOpen] =
    useState<boolean>(false);
  const [isCreateRuleModalOpen, setCreateRuleModalOpen] =
    useState<boolean>(false);
  const [isUpdateRuleModalOpen, setUpdateRuleModalOpen] =
    useState<boolean>(false);
  const [currentStoreInfo, setCurrentStoreInfo] = useState<ICurrentStoreInfo>(
    {} as ICurrentStoreInfo
  );
  const [currentRuleInfo, setCurrentRuleInfo] = useState<ICurrentRuleInfo>(
    {} as ICurrentRuleInfo
  );

  useEffect(() => {
    const getStores = async (): Promise<void> => {
      try {
        const savedStores = await readLocalStorage('stores');
        setStores(savedStores as IStore[]);
      } catch (err) {
        // o storage nao foi iniciado
        console.log(err);
        setStores([] as IStore[]);
      }
    };

    getStores();
  }, []);

  useEffect(() => {
    setLocalStorage('stores', stores);
    setStoresToShow(stores);
  }, [stores]);

  console.log('todas as lojas', stores);
  // console.log('lojas para mostrar', stores);

  const updateStoresToShow = (searchQuery: SearchQuery): void => {
    const updatedStoresToShow = stores?.filter((store) =>
      store.vendor.includes(searchQuery)
    );
    setStoresToShow(updatedStoresToShow);
  };

  const updateStore = (
    storeID: number,
    {vendor, admin, rules, active}: IStore
  ): void => {
    setStores((previousStores) => {
      return previousStores.map((store, index) => {
        return index === storeID
          ? {
              ...store,
              vendor,
              admin,
              rules,
              active,
            }
          : store;
      });
    });
  };

  const createStore = (store: IStore): void => {
    setStores((previousStores) => [...previousStores, store]);
  };

  const removeStore = (storeID: number): void => {
    setStores((previousStores) =>
      previousStores.filter((_store, storeIndex) => storeIndex !== storeID)
    );
  };

  const createRule = (storeID: number, rule: IRule): void => {
    setStores((previousStores) => {
      return previousStores.map((store, storeIndex) => {
        return storeIndex === storeID
          ? {...store, rules: [...store.rules, rule]}
          : store;
      });
    });
  };

  const removeRule = (storeID: number, ruleID: number): void => {
    setStores((previousStores) => {
      return previousStores.map((store, storeIndex) => {
        return storeIndex === storeID
          ? {
              ...store,
              rules: [
                ...store?.rules?.filter(
                  (_rule, ruleIndex) => ruleIndex !== ruleID
                ),
              ],
            }
          : store;
      });
    });
  };

  const updateRule = (
    storeID: number,
    ruleID: number,
    {active, name, urlFrom, urlTo}: IRule
  ): void => {
    setStores((previousStores) => {
      return previousStores.map((store, storeIndex) => {
        return storeIndex === storeID
          ? {
              ...store,
              rules: [
                ...store?.rules?.map((rule, ruleIndex) => {
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
      });
    });
  };

  const setShowCreateStoreModal = (condition: boolean): void => {
    setCreateStoreModalOpen(condition);
  };
  const setShowUpdateStoreModal = (condition: boolean): void => {
    setUpdateStoreModalOpen(condition);
  };
  const setShowCreateRuleModal = (condition: boolean): void => {
    setCreateRuleModalOpen(condition);
  };

  const setShowUpdateRuleModal = (condition: boolean): void => {
    setUpdateRuleModalOpen(condition);
  };

  const updateCurrentStoreInfo = (storeID: number): void => {
    const store: IStore = stores[storeID];
    setCurrentStoreInfo({storeID, store});
  };

  const updateCurrentRuleInfo = (storeID: number, ruleID: number): void => {
    const rule: IRule = stores[storeID].rules[ruleID];
    setCurrentRuleInfo({storeID, ruleID, rule});
  };

  const StoresContextValues = {
    stores,
    storesToShow,
    updateStoresToShow,
    createStore,
    removeStore,
    updateStore,
    createRule,
    removeRule,
    updateRule,
    isCreateStoreModalOpen,
    isUpdateStoreModalOpen,
    isCreateRuleModalOpen,
    isUpdateRuleModalOpen,
    setShowCreateStoreModal,
    setShowUpdateStoreModal,
    setShowCreateRuleModal,
    setShowUpdateRuleModal,
    currentStoreInfo,
    updateCurrentStoreInfo,
    currentRuleInfo,
    updateCurrentRuleInfo,
  };

  return (
    <StoresContext.Provider value={StoresContextValues}>
      {children}
    </StoresContext.Provider>
  );
};

export {StoresContextProvider, StoresContext};
