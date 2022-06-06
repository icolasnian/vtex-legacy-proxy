import React, {FC, useContext} from 'react';
import {ProxyContext} from '../ProxyContextProvider';
import StoreContainer from './StoreContainer';
import './styles.scss';

const StoresList: FC = () => {
  const {storesToShow} = useContext(ProxyContext);

  return (
    <div className="popupContainer-storesList">
      {storesToShow !== undefined &&
        storesToShow.length > 0 &&
        storesToShow.map((store, storeIndex) => (
          <StoreContainer
            key={store.admin}
            active={store.active}
            storeID={storeIndex}
            vendor={store.vendor}
            admin={store.admin}
            rules={store.rules}
          />
        ))}
    </div>
  );
};

export default StoresList;
