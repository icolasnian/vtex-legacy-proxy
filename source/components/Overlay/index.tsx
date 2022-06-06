/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {FC, useContext} from 'react';
import {Portal} from 'react-portal';
import {ProxyContext} from '../ProxyContextProvider';

import './styles.scss';

interface IOverlay {
  children: React.ReactNode;
}

const Overlay: FC<IOverlay> = ({children}: IOverlay) => {
  const {
    setShowCreateStoreModal,
    setShowCreateRuleModal,
    setShowUpdateStoreModal,
    setShowUpdateRuleModal,
  } = useContext(ProxyContext);

  const handleCloseModals = (): void => {
    setShowCreateStoreModal(false);
    setShowCreateRuleModal(false);
    setShowUpdateStoreModal(false);
    setShowUpdateRuleModal(false);
  };
  const CloseButton: FC = () => {
    return (
      <button
        onClick={(): void => handleCloseModals()}
        type="button"
        className="overlay-close"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.5 1.5L1.5 16.5"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1.5 1.5L16.5 16.5"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    );
  };

  return (
    <Portal>
      <CloseButton />
      <div onClick={(): void => handleCloseModals()} className="overlay">
        {children}
      </div>
    </Portal>
  );
};

export default Overlay;
