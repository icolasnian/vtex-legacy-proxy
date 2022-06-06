/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {FC, useContext, useState, FormEvent, useEffect} from 'react';
import Overlay from '../../Overlay';
import {ProxyContext, IStore} from '../../ProxyContextProvider';

import '../styles.scss';

const UpdateStoreModal: FC = () => {
  const {
    isUpdateStoreModalOpen,
    updateStore,
    setShowUpdateStoreModal,
    currentStoreInfo,
  } = useContext(ProxyContext);

  const {storeID, store} =
    (typeof currentStoreInfo !== 'undefined' && currentStoreInfo) || {};

  const [updateStoreData, setUpdateStoreData] = useState<IStore>(
    store !== undefined ? store : ({} as IStore)
  );

  const handleCreateStore = (
    event: FormEvent<HTMLFormElement>,
    updateStoreDataParam: IStore
  ): void => {
    event.preventDefault();
    updateStore(storeID as number, updateStoreDataParam);
    setShowUpdateStoreModal(false);
  };

  useEffect(() => {
    if (store) {
      setUpdateStoreData(store);
    }
  }, [store]);

  return (
    <>
      {isUpdateStoreModalOpen ? (
        <Overlay>
          <div
            onClick={(event): void => event.stopPropagation()}
            className="modal"
          >
            <h2 className="modal-title">Edit Store</h2>

            <div className="modal-formContainer">
              <form
                onSubmit={(event): void =>
                  handleCreateStore(event, updateStoreData)
                }
                className="modal-formContainer_form"
              >
                <fieldset className="modal-formContainer_form-inputContainer">
                  <label
                    className="modal-formContainer_form-inputContainer--label"
                    htmlFor="store-vendor"
                  >
                    Store vendor:
                  </label>
                  <input
                    defaultValue={store?.vendor}
                    onChange={(event): void =>
                      setUpdateStoreData((previousStoreData) => ({
                        ...previousStoreData,
                        vendor: event.target.value,
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
                    Store admin:
                  </label>
                  <input
                    defaultValue={store?.admin}
                    onChange={(e): void =>
                      setUpdateStoreData((previousStoreData) => ({
                        ...previousStoreData,
                        admin: e.target.value,
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

export default UpdateStoreModal;
