import React, { useState } from 'react';
import StoreContext from './StoreContext';

export interface ProviderProps {
  store?: any;
  children?: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = (props) => {
  const { store, children } = props;

  const [, forceUpdate] = useState({});

  const forceRender = () => {
    forceUpdate({});
  };

  return (
    <StoreContext.Provider
      value={{
        ...store,
        forceRender,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default Provider;
