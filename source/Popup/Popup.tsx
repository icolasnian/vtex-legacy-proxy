import React, {FC} from 'react';
import Header from '../components/Header';
import {ProxyContextProvider} from '../components/ProxyContextProvider';
import Search from '../components/Search';
import CreateStoreModal from '../components/Modals/CreateStoreModal';
import CreateRuleModal from '../components/Modals/CreateRuleModal';
import UpdateRuleModal from '../components/Modals/UpdateRuleModal';
import UpdateStoreModal from '../components/Modals/UpdateStoreModal';
import StoresList from '../components/StoresList';

import '../styles/_reset.scss';
import '../styles/_fonts.scss';
import './styles.scss';

const Popup: FC = () => {
  return (
    <ProxyContextProvider>
      <div className="popupContainer">
        <Header />
        <Search />
        <StoresList />
        <CreateStoreModal />
        <CreateRuleModal />
        <UpdateRuleModal />
        <UpdateStoreModal />
      </div>
    </ProxyContextProvider>
  );
};

export default Popup;
