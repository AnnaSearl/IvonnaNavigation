import React, { useContext } from 'react';

const EMPTY: unique symbol = Symbol();

export interface ContainerProviderProps<State = void> {
  initialState?: State;
  children: React.ReactNode;
}

export interface ContainerProps<Value, State = void> {
  Provider: React.ComponentType<ContainerProviderProps<State>>;
  useContainer: () => Value;
}

function createContainer<Value, State = void>(
  useHook: (initialState?: State) => Value
): ContainerProps<Value, State> {
  const Context = React.createContext<Value | typeof EMPTY>(EMPTY);

  function Provider(props: ContainerProviderProps<State>) {
    const { initialState, children } = props;

    const value = useHook(initialState);

    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  function useContainer(): Value {
    const value = useContext(Context);
    if (value === EMPTY) {
      throw new Error('Component must be wrapped with <Container.Provider>');
    }
    return value;
  }

  return { Provider, useContainer };
}

export default createContainer;
