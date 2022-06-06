/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {FC, useContext, useState, FormEvent, useEffect} from 'react';
import Overlay from '../../Overlay';
import {ProxyContext, IRule} from '../../ProxyContextProvider';

import '../styles.scss';

const UpdateRuleModal: FC = () => {
  const {
    isUpdateRuleModalOpen,
    currentRuleInfo,
    updateRule,
    setShowUpdateRuleModal,
  } = useContext(ProxyContext);

  const {storeID, ruleID, rule} =
    (typeof currentRuleInfo !== 'undefined' && currentRuleInfo) || {};

  const [updateRuleData, setUpdateRuleData] = useState<IRule>(
    rule !== undefined ? rule : ({} as IRule)
  );

  const handleUpdateRule = (
    event: FormEvent<HTMLFormElement>,
    updateRuleDataParam: IRule
  ): void => {
    event.preventDefault();
    updateRule(storeID as number, ruleID as number, updateRuleDataParam);
    setShowUpdateRuleModal(false);
  };

  useEffect(() => {
    if (rule) {
      setUpdateRuleData(rule);
    }
  }, [rule]);

  return (
    <>
      {isUpdateRuleModalOpen ? (
        <Overlay>
          <div
            onClick={(event): void => event.stopPropagation()}
            className="modal"
          >
            <h2 className="modal-title">Edit Rule</h2>

            <div className="modal-formContainer">
              <form
                onSubmit={(event): void =>
                  handleUpdateRule(event, updateRuleData)
                }
                className="modal-formContainer_form"
              >
                <fieldset className="modal-formContainer_form-inputContainer">
                  <label
                    className="modal-formContainer_form-inputContainer--label"
                    htmlFor="store-vendor"
                  >
                    Rule name:
                  </label>
                  <input
                    defaultValue={rule?.name}
                    onChange={(event): void =>
                      setUpdateRuleData((previousRuleData) => ({
                        ...previousRuleData,
                        name: event.target.value,
                      }))
                    }
                    className="modal-formContainer_form-inputContainer--input"
                    id="store-vendor"
                    name="store-vendor"
                    type="text"
                  />
                </fieldset>
                <fieldset className="modal-formContainer_form-inputContainer">
                  <label
                    className="modal-formContainer_form-inputContainer--label"
                    htmlFor="store-admin"
                  >
                    Url from:
                  </label>
                  <input
                    defaultValue={rule?.urlFrom}
                    onChange={(e): void =>
                      setUpdateRuleData((previousRuleData) => ({
                        ...previousRuleData,
                        urlFrom: e.target.value,
                      }))
                    }
                    className="modal-formContainer_form-inputContainer--input"
                    id="store-admin"
                    name="store-admin"
                    type="text"
                  />
                </fieldset>

                <fieldset className="modal-formContainer_form-inputContainer">
                  <label
                    className="modal-formContainer_form-inputContainer--label"
                    htmlFor="store-admin"
                  >
                    Url to:
                  </label>
                  <input
                    defaultValue={rule?.urlTo}
                    onChange={(e): void =>
                      setUpdateRuleData((previousRuleData) => ({
                        ...previousRuleData,
                        urlTo: e.target.value,
                      }))
                    }
                    className="modal-formContainer_form-inputContainer--input"
                    id="store-admin"
                    name="store-admin"
                    type="text"
                  />
                </fieldset>

                <div className="modal-formContainer_form-submitContainer">
                  <button
                    className="modal-formContainer_form-submitContainer-submit"
                    type="submit"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Overlay>
      ) : (
        <></>
      )}
    </>
  );
};

export default UpdateRuleModal;
