/* eslint-disable import/namespace */
import React, {FC, useContext} from 'react';
import {PlusIcon} from '../../utils/icons.util';
import {ProxyContext} from '../ProxyContextProvider';

import './styles.scss';

const Header: FC = () => {
  const {setShowCreateStoreModal} = useContext(ProxyContext);

  return (
    <header className="popupContainer-header">
      <h1 className="popupContainer-header--title">
        <span className="popupContainer-header--title_pink">VTEX</span>
        Legacy Proxy
      </h1>
      <div className="popupContainer-header--description">
        <p className="popupContainer-header--description--text">
          VTEX Legacy Proxy is an extension which allows you to create multiple
          file proxy rules for multiple VTEX stores, making the developer
          experience much better.
        </p>
        <div className="popupContainer-header--description--enjoy_create">
          <span className="popupContainer-header--description--enjoy_create-enjoy">
            Create a store and enjoy :D
          </span>
          <button
            onClick={(): void => setShowCreateStoreModal(true)}
            type="button"
            className="popupContainer-header--description--enjoy_create-create"
          >
            <p>Create store</p> <PlusIcon />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
