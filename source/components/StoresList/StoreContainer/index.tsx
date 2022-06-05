/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {FC, useState, useContext} from 'react';
import Toggle from '@atlaskit/toggle';
import {StoresContext, IStore} from '../../StoresContextProvider';
import StoreRules from './StoreRules';
import StoreTrigger from './StoreTrigger';
import {ArrowIcon} from '../../../utils/icons.util';
import './styles.scss';

export interface IStoreContainer extends IStore {
  storeID: number;
}

const StoreContainer: FC<IStoreContainer> = ({
  storeID,
  active,
  vendor,
  admin,
  rules,
}: IStoreContainer) => {
  const [open, setOpen] = useState<boolean>(false);

  const {
    updateCurrentStoreInfo,
    setShowCreateRuleModal,
    setShowUpdateStoreModal,
    removeStore,
    updateStore,
  } = useContext(StoresContext);

  const handleUpdateCurrentStoreInfo = (storeIndex: number): void => {
    updateCurrentStoreInfo(storeIndex);
  };

  const handleCreateRule = (storeIndex: number): void => {
    handleUpdateCurrentStoreInfo(storeIndex);
    setShowCreateRuleModal(true);
  };

  const handleUpdateActiveStore = (): void => {
    updateStore(storeID, {active: !active, vendor, admin, rules});
  };

  const handleUpdateStore = (storeIndex: number): void => {
    updateCurrentStoreInfo(storeIndex);
    setShowUpdateStoreModal(true);
  };

  return (
    <div
      className={
        open
          ? 'popupContainer--storesList-storeContainer storeContainerOpen'
          : 'popupContainer--storesList-storeContainer'
      }
    >
      <StoreTrigger setOpen={setOpen}>
        <div
          onClick={(e): void => e.stopPropagation()}
          className="popupContainer--storesList-storeContainer-storeTrigger-vendor_toggle"
        >
          <p className="popupContainer--storesList-storeContainer-storeTrigger-vendor_toggle-vendor">
            {vendor}
          </p>

          <Toggle
            isChecked={active}
            onChange={(): void => handleUpdateActiveStore()}
          />
        </div>

        <ArrowIcon />
      </StoreTrigger>

      {open && (
        <div className="popupContainer--storesList-storeContainer-storeContent">
          <div className="popupContainer--storesList-storeContainer-storeContent-actions">
            <h3 className="popupContainer--storesList-storeContainer-storeContent-actions--title">
              Actions
            </h3>

            <div className="popupContainer--storesList-storeContainer-storeContent-actions--buttons">
              <a
                href={admin}
                type="button"
                className="popupContainer--storesList-storeContainer-storeContent-actions--buttons-admin"
              >
                Admin
              </a>
              <button
                onClick={(): void => handleCreateRule(storeID)}
                type="button"
                className="popupContainer--storesList-storeContainer-storeContent-actions--buttons-addRule"
              >
                Create Rule
              </button>
              <button
                onClick={(): void => handleUpdateStore(storeID)}
                type="button"
                className="popupContainer--storesList-storeContainer-storeContent-actions--buttons-editStore"
              >
                Edit store
              </button>
              <button
                onClick={(): void => removeStore(storeID)}
                type="button"
                className="popupContainer--storesList-storeContainer-storeContent-actions--buttons-removeStore"
              >
                Remove store
              </button>
            </div>
          </div>
          <div className="popupContainer--storesList-storeContainer-storeContent-rules">
            <h3 className="popupContainer--storesList-storeContainer-storeContent-rules--title">
              Rules
            </h3>

            <div className="popupContainer--storesList-storeContainer-storeContent-rules--rulesContainer">
              {rules.length > 0 &&
                rules.map((rule, ruleID) => (
                  <StoreRules
                    storeID={storeID}
                    key={rule.urlFrom}
                    ruleID={ruleID}
                    urlFrom={rule.urlFrom}
                    urlTo={rule.urlTo}
                    active={rule.active}
                    name={rule.name}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreContainer;
