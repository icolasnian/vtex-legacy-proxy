/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {FC, useContext, useState, FormEvent} from 'react';
import Overlay from '../../Overlay';
import {StoresContext, IRule} from '../../StoresContextProvider';
import {Info} from '../../../utils/icons.util';
import '../styles.scss';

const CreateRuleModal: FC = () => {
  const {
    isCreateRuleModalOpen,
    currentStoreInfo,
    createRule,
    setShowCreateRuleModal,
  } = useContext(StoresContext);

  const {storeID} = currentStoreInfo;

  const [createRuleData, setCreateRuleData] = useState<IRule>({
    active: false,
    urlFrom: '',
    urlTo: '',
  } as IRule);

  const handleCreateRule = (
    event: FormEvent<HTMLFormElement>,
    createRuleDataParam: IRule
  ): void => {
    event.preventDefault();
    createRule(storeID, createRuleDataParam);
    setShowCreateRuleModal(false);
  };

  return (
    <>
      {isCreateRuleModalOpen ? (
        <Overlay>
          <div
            onClick={(event): void => event.stopPropagation()}
            className="modal"
          >
            <h2 className="modal-title">Create Rule</h2>

            <div className="modal-formContainer">
              <form
                onSubmit={(event): void =>
                  handleCreateRule(event, createRuleData)
                }
                className="modal-formContainer_form"
              >
                <fieldset className="modal-formContainer_form-inputContainer">
                  <label
                    className="modal-formContainer_form-inputContainer--label"
                    htmlFor="store-vendor"
                  >
                    <p>Rule name:</p>

                    <Info message="The rule name. Pick a name easy to identify." />
                  </label>
                  <input
                    required
                    minLength={3}
                    onChange={(event): void =>
                      setCreateRuleData((previousRuleData) => ({
                        ...previousRuleData,
                        name: event.target.value,
                      }))
                    }
                    className="modal-formContainer_form-inputContainer--input"
                    id="store-vendor"
                    name="store-vendor"
                    type="text"
                  />
                  <p className="example">Example: checkout6.css</p>
                </fieldset>
                <fieldset className="modal-formContainer_form-inputContainer">
                  <label
                    className="modal-formContainer_form-inputContainer--label"
                    htmlFor="store-admin"
                  >
                    <p>Url from:</p>
                    <Info message="The original file url which will be replaced with your local file. Pay attention to http/https and www." />
                  </label>
                  <input
                    required
                    minLength={10}
                    onChange={(e): void =>
                      setCreateRuleData((previousRuleData) => ({
                        ...previousRuleData,
                        urlFrom: e.target.value,
                      }))
                    }
                    className="modal-formContainer_form-inputContainer--input"
                    id="store-admin"
                    name="store-admin"
                    type="text"
                  />
                  <p className="example">
                    Example: storeurl/arquivos/checkout6.css
                  </p>
                </fieldset>

                <fieldset className="modal-formContainer_form-inputContainer">
                  <label
                    className="modal-formContainer_form-inputContainer--label"
                    htmlFor="store-admin"
                  >
                    <p>Url to:</p>
                    <Info message="The url for your localhost files. Pay attention to http/https and www." />
                  </label>
                  <input
                    required
                    minLength={10}
                    onChange={(e): void =>
                      setCreateRuleData((previousRuleData) => ({
                        ...previousRuleData,
                        urlTo: e.target.value,
                      }))
                    }
                    className="modal-formContainer_form-inputContainer--input"
                    id="store-admin"
                    name="store-admin"
                    type="text"
                  />
                  <p className="example">
                    Example: localhost:3000/arquivos/checkout6.css
                  </p>
                </fieldset>

                <div className="modal-formContainer_form-submitContainer">
                  <button
                    className="modal-formContainer_form-submitContainer-submit"
                    type="submit"
                  >
                    Create
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

export default CreateRuleModal;
