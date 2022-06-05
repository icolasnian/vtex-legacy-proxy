import React, {FC} from 'react';
import Header from '../components/Header';
import {StoresContextProvider} from '../components/StoresContextProvider';
import Search from '../components/Search';
import CreateStoreModal from '../components/Modals/CreateStoreModal';
import CreateRuleModal from '../components/Modals/CreateRuleModal';
import UpdateRuleModal from '../components/Modals/UpdateRuleModal';
import StoresList from '../components/StoresList';

import '../styles/_reset.scss';
import '../styles/_fonts.scss';
import './styles.scss';
import UpdateStoreModal from '../components/Modals/UpdateStoreModal';

const Popup: FC = () => {
  return (
    <StoresContextProvider>
      <div className="popupContainer">
        <Header />
        <Search />
        <StoresList />
        <CreateStoreModal />
        <CreateRuleModal />
        <UpdateRuleModal />
        <UpdateStoreModal />
      </div>
    </StoresContextProvider>
  );
};

export default Popup;
