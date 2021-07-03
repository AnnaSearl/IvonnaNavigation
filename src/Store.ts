import React from 'react';
import { IvonnaObject } from './interface';

export interface StoreManagerProps {
  setStoreValue?: (name: string, value: any) => void;
  getStoreValue?: (name: string) => any;
  setStore?: (values: any) => void;
  getStore?: () => any;
  registerComponent?: (
    componentId: string,
    component: React.ComponentType
  ) => void;
  registerComponentInstance?: (
    componentId: string,
    componentInstance: React.Component
  ) => void;
  removeComponentInstance?: (
    componentId: string,
    componentInstance: React.Component
  ) => void;
  forceUpdateComponent?: (componentId: string) => void;
  forceUpdateComponents?: (componentIds: string[]) => void;
  notifyComponentsToReRender?: (componentid: string | string[]) => void;
}

export interface StoreProps {
  getStoreManager: () => StoreManagerProps;
}

export interface ComponentInstanceMappingTableProps {
  [propName: string]: React.Component[];
}

class Store implements StoreProps {
  private store: IvonnaObject = {};

  private componentMappingTable: IvonnaObject = {};

  private componentInstanceMappingTable: ComponentInstanceMappingTableProps =
    {};

  constructor() {}

  public getStoreManager = () => ({
    setStoreValue: this.setStoreValue,
    getStoreValue: this.getStoreValue,
    setStore: this.setStore,
    getStore: this.getStore,
    registerComponent: this.registerComponent,
    registerComponentInstance: this.registerComponentInstance,
    removeComponentInstance: this.removeComponentInstance,
    forceUpdateComponent: this.forceUpdateComponent,
    forceUpdateComponents: this.forceUpdateComponents,
    notifyComponentsToReRender: this.notifyComponentsToReRender,
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

  private registerComponent = (
    componentId: string,
    component: React.ComponentType
  ) => {
    this.componentMappingTable[componentId] = component;
  };

  private registerComponentInstance = (
    componentId: string,
    componentInstance: React.Component
  ) => {
    let list = this.componentInstanceMappingTable[componentId];
    if (Array.isArray(list)) {
      if (!list.includes(componentInstance)) {
        list.push(componentInstance);
      }
    } else {
      list = [componentInstance];
      // 防止 list 为 undefined
      this.componentInstanceMappingTable[componentId] = list;
    }
  };

  private removeComponentInstance = (
    componentId: string,
    componentInstance: React.Component
  ) => {
    let list = this.componentInstanceMappingTable[componentId];
    if (Array.isArray(list)) {
      if (list.includes(componentInstance)) {
        list.splice(list.indexOf(componentInstance));
      }
    }
  };

  private forceUpdateComponent = (componentId: string) => {
    const componentInstanceList =
      this.componentInstanceMappingTable[componentId];
    if (Array.isArray(componentInstanceList)) {
      componentInstanceList.forEach((instance) => {
        instance.forceUpdate();
      });
    }
  };

  private forceUpdateComponents = (componentIds: string[]) => {
    for (const componentId of componentIds) {
      this.forceUpdateComponent(componentId);
    }
  };

  private notifyComponentsToReRender = (componentid: string | string[]) => {
    if (Array.isArray(componentid)) {
      this.forceUpdateComponents(componentid);
      return;
    }
    this.forceUpdateComponent(componentid);
  };
}

export default Store;
