import React, { useContext } from 'react';

const EMPTY: unique symbol = Symbol();

export interface ContainerProviderProps {
  initialState?: any;
  children: React.ReactNode;
}

export interface ContainerProps {
  Provider?: any;
  useContainer?: () => any;
}

const createContainer = (
  useHook: (initialState?: any) => any
): ContainerProps => {
  const Context = React.createContext(EMPTY);

  function Provider(props: ContainerProviderProps) {
    const { initialState, children } = props;

    const value = useHook(initialState);

    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  function useContainer() {
    const value = useContext(Context);
    if (value === EMPTY) {
      throw new Error('Component must be wrapped with <Container.Provider>');
    }
    return value;
  }

  return { Provider, useContainer };
};

export default createContainer;
