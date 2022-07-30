import React, {FC, useContext} from 'react';
import Toggle from '@atlaskit/toggle';
import {IRule, ProxyContext} from '../../ProxyContextProvider';
import {EditRuleIcon, RemoveRuleIcon} from '../../../utils/icons.util';

interface IStoreRules extends IRule {
  storeID: number;
  ruleID: number;
}

const StoreRules: FC<IStoreRules> = ({
  storeID,
  ruleID,
  action,
  condition,
  priority,
  active,
  name,
}: IStoreRules) => {
  const {
    updateRule,
    removeRule,
    updateCurrentRuleInfo,
    setShowUpdateRuleModal,
  } = useContext(ProxyContext);

  const handleUpdateActiveRule = (): void => {
    updateRule(storeID, ruleID, {
      active: !active,
      name,
      action,
      condition,
      priority,
    });
  };

  const handleRemoveRule = (): void => {
    removeRule(storeID, ruleID);
  };

  const handleUpdateCurrentRule = (): void => {
    updateCurrentRuleInfo(storeID, ruleID);
    setShowUpdateRuleModal(true);
  };

  return (
    <div className="popupContainer--storesList-storeContainer-storeContent-rules--rulesContainer-rule">
      <div className="popupContainer--storesList-storeContainer-storeContent-rules--rulesContainer-rule-name_toggle">
        <p>{name}</p>
        <Toggle
          isChecked={active}
          onChange={(): void => handleUpdateActiveRule()}
        />
      </div>

      <div className="popupContainer--storesList-storeContainer-storeContent-rules--rulesContainer-rule-icons">
        <button
          onClick={(): void => handleUpdateCurrentRule()}
          type="button"
          className="popupContainer--storesList-storeContainer-storeContent-rules--rulesContainer-rule-icons-edit"
        >
          <EditRuleIcon />
        </button>
        <button
          onClick={(): void => handleRemoveRule()}
          type="button"
          className="popupContainer--storesList-storeContainer-storeContent-rules--rulesContainer-rule-icons-remove"
        >
          <RemoveRuleIcon />
        </button>
      </div>
    </div>
  );
};

export default StoreRules;
