import React from 'react';
import { IvonnaObject } from '../interface';

export interface StoreManagerProps {
  setStoreValue?: (name: string, value: any) => void;
  getStoreValue?: (name: string) => any;
  setStore?: (values: any) => void;
  getStore?: () => any;
  registerComponent?: (screenName: string, screen: React.ComponentType) => void;
}

export interface StoreProps {
  getStoreManager: () => StoreManagerProps;
}

export interface ComponentInstanceMappingTableProps {
  [propName: string]: React.Component[];
}

class StackStore implements StoreProps {
  private store: IvonnaObject = {};

  private mappingTable: IvonnaObject = {};

  constructor() {}

  public getStoreManager = () => ({
    setStoreValue: this.setStoreValue,
    getStoreValue: this.getStoreValue,
    setStore: this.setStore,
    getStore: this.getStore,
    registerScreen: this.registerScreen,
  });

  private setStoreValue = (
    name: string,
    value: any | ((state: IvonnaObject) => void)
  ) => {
    if (typeof value === 'function') {
      const state = this.getStoreValue(name) || {};
      value(state);
      this.store = Object.assign({}, this.store, { [name]: state });
      return;
    }
    this.store = Object.assign({}, this.store, { [name]: value });
  };

  private getStoreValue = (name: string) => {
    return this.store?.[name];
  };

  private setStore = (values: any) => {
    this.store = Object.assign({}, this.store, values);
  };

  private getStore = () => {
    return this.store;
  };

  private registerScreen = (
    screenName: string,
    screen: React.ComponentType
  ) => {
    this.mappingTable[screenName] = screen;
  };
}

export default StackStore;

// 如果要搜集所有页面名称，则每个页面必须要在 store 上注册其名称
