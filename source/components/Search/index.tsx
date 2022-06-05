import React, {FC, useContext} from 'react';
import {StoresContext} from '../StoresContextProvider';
import './styles.scss';

const Search: FC = () => {
  const {updateStoresToShow, stores} = useContext(StoresContext);

  const handleUpdateStoresToShow = (searchQuery: string): void => {
    updateStoresToShow(searchQuery);
  };

  return (
    <div className="popupContainer--searchContainer">
      {stores.length > 0 && (
        <input
          placeholder="Search stores..."
          className="popupContainer--searchContainer-search"
          onChange={(event): void =>
            handleUpdateStoresToShow(event.target.value)
          }
        />
      )}
    </div>
  );
};

export default Search;
