/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {FC, useContext, useState, FormEvent} from 'react';
import {Info} from '../../../utils/icons.util';
import Overlay from '../../Overlay';
import {StoresContext, IStore} from '../../StoresContextProvider';

import '../styles.scss';

const CreateStoreModal: FC = () => {
  const {isCreateStoreModalOpen, createStore, setShowCreateStoreModal} =
    useContext(StoresContext);

  const [createStoreData, setCreateStoreData] = useState<IStore>({
    vendor: '',
    admin: '',
    rules: [],
    active: true,
  } as IStore);

  const handleCreateStore = (
    event: FormEvent<HTMLFormElement>,
    createStoreDataParam: IStore
  ): void => {
    event.preventDefault();
    createStore(createStoreDataParam);
    setShowCreateStoreModal(false);
  };

  return (
    <>
      {isCreateStoreModalOpen ? (
        <Overlay>
          <div
            onClick={(event): void => event.stopPropagation()}
            className="modal"
          >
            <h2 className="modal-title">Create Store</h2>

            <div className="modal-formContainer">
              <form
                onSubmit={(event): void =>
                  handleCreateStore(event, createStoreData)
                }
                className="modal-formContainer_form"
              >
                <fieldset className="modal-formContainer_form-inputContainer">
                  <label
                    className="modal-formContainer_form-inputContainer--label"
                    htmlFor="store-vendor"
                  >
                    <p>Store vendor:</p>
                    <Info message="The store name. Whatever name you choose will not affect proxying urls, pick a name easy to identify." />
                  </label>
                  <input
                    required
                    minLength={3}
                    onChange={(event): void =>
                      setCreateStoreData((previousStoreData) => ({
                        ...previousStoreData,
                        vendor: event.target.value,
                      }))
                    }
                    className="modal-formContainer_form-inputContainer--input"
                    id="store-vendor"
                    name="store-vendor"
                    type="text"
                  />
                  <p className="example">Example: candystore</p>
                </fieldset>
                <fieldset className="modal-formContainer_form-inputContainer">
                  <label
                    className="modal-formContainer_form-inputContainer--label"
                    htmlFor="store-admin"
                  >
                    <p>Store admin:</p>
                    <Info message="The store admin panel url, will be used to redirect when clicking admin button later." />
                  </label>
                  <input
                    required
                    minLength={15}
                    onChange={(e): void =>
                      setCreateStoreData((previousStoreData) => ({
                        ...previousStoreData,
                        admin: e.target.value,
                      }))
                    }
                    className="modal-formContainer_form-inputContainer--input"
                    id="store-admin"
                    name="store-admin"
                    type="text"
                  />
                  <p className="example">
                    Example: https://candystore.myvtex.com/admin
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

export default CreateStoreModal;
