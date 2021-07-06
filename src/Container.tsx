import { useState } from 'react';
import { StoreManagerProps } from './Store';
import CreateContainer, { ContainerProps } from './CreateContainer';
import { Store as StoreManager } from './index';
import { IvonnaObject } from './interface';

function useApp() {
  const [, forceUpdate] = useState({});

  const forceRender = () => {
    forceUpdate({});
  };

  const store = StoreManager.getStore?.();
  const setStore = (values: any) => {
    StoreManager.setStore?.(values);
    forceRender();
  };
  const setStoreValue = (name: string, value: any) => {
    StoreManager.setStoreValue?.(name, value);
    forceRender();
  };

  return {
    store,
    setStore,
    getStoreValue: StoreManager.getStoreValue,
    setStoreValue,
    notifyComponentsToReRender: StoreManager.notifyComponentsToReRender,
  };
}

const AContainer = CreateContainer(useApp);

export interface ModuleUseContainer extends StoreManagerProps {
  store?: any;
  setStore?: (value: any) => void;
  moduleStore?: any;
  setModuleStore?: (value: any | ((state: IvonnaObject) => void)) => void;
  notifyComponentsToReRender?: (componentid: string | string[]) => void;
}

function createModuleContainer(container: ContainerProps<any, any>) {
  function useContainer(): {
    store: any;
    setStore: (value: any) => void;
    notifyComponentsToReRender?: (componentid: string | string[]) => void;
  };
  function useContainer<S = any>(
    moduleName: string
  ): {
    moduleStore: any;
    setModuleStore: (value: ((state: S) => void) | S) => void;
  };
  function useContainer(moduleName?: string): ModuleUseContainer {
    const {
      getStoreValue,
      setStoreValue,
      store,
      setStore,
      notifyComponentsToReRender,
    } = container.useContainer?.();

    if (!moduleName) {
      return { store, setStore, notifyComponentsToReRender };
    }

    const moduleStore = getStoreValue?.(moduleName);
    function setModuleStore(value: any | ((state: IvonnaObject) => void)) {
      setStoreValue?.(moduleName, value);
    }

    return { moduleStore, setModuleStore };
  }
  return { Provider: container.Provider, useContainer };
}

const Container = createModuleContainer(AContainer);

export default Container;
