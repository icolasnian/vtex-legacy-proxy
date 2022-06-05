import React, {FC, Dispatch, SetStateAction} from 'react';

interface IStoreTrigger {
  children: React.ReactNode;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const StoreTrigger: FC<IStoreTrigger> = ({
  children,
  setOpen,
}: IStoreTrigger) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      onClick={(): void => setOpen((prevOpen) => !prevOpen)}
      className="popupContainer--storesList-storeContainer-storeTrigger"
    >
      {children}
    </div>
  );
};

export default StoreTrigger;
