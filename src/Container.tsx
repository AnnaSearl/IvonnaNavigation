import { useState, useEffect } from 'react';
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
  // 此变量一定要放在 useContainer 方法的外面，不然 每次 useContainer 方法执行都会创建一个该变量，这样就不是单例了。
  const initialModuleValueMapping: IvonnaObject = {};

  // type
  function useContainer(): {
    store: any;
    setStore: (value: any) => void;
    notifyComponentsToReRender?: (componentid: string | string[]) => void;
  };
  function useContainer(initialValue: any): {
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
  function useContainer<S = any>(
    moduleName: string,
    initialValue: any
  ): {
    moduleStore: any;
    setModuleStore: (value: ((state: S) => void) | S) => void;
  };

  // function
  function useContainer(
    moduleName?: string,
    initialValue?: any
  ): ModuleUseContainer {
    const {
      getStoreValue,
      setStoreValue,
      store,
      setStore,
      notifyComponentsToReRender,
    } = container.useContainer?.();

    useEffect(() => {
      if (!moduleName) {
        if (!initialModuleValueMapping?.hasOwnProperty('global')) {
          // 设置初始值
          initialModuleValueMapping.global = initialValue;
          setStore(initialValue);
        }
      } else {
        if (!initialModuleValueMapping?.hasOwnProperty(moduleName)) {
          initialModuleValueMapping[moduleName] = initialValue;
          setStoreValue?.(moduleName, initialValue);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
