import React from 'react';
import { AppRegistry as ReactAppRegistry } from 'react-native';
import { Container, Store } from './index';
import { IvonnaObject } from './interface';

export interface ComponentMappingList extends IvonnaObject {
  [propName: string]: React.ComponentType;
}

const DefaultApp: React.FC = () => {
  return <></>;
};

const setComponentProvider = (component: React.ComponentType) => {
  return () => component;
};

export interface WrappedComponentProps {
  children?: React.ReactNode;
}

export type RootComponentType = React.ComponentType<{ pageName?: string }>;

const wrapComponent = (
  componentId: string,
  RootComponent: RootComponentType
) => {
  class WrappedComponent extends React.Component<WrappedComponentProps, any> {
    constructor(props: WrappedComponentProps) {
      super(props);
      Store.registerComponentInstance(componentId, this);
    }

    componentWillUnmount() {
      Store.removeComponentInstance(componentId, this);
    }

    render() {
      const { children } = this.props;
      return (
        <Container.Provider>
          <RootComponent {...this.props} pageName={componentId}>
            {children}
          </RootComponent>
        </Container.Provider>
      );
    }
  }

  return WrappedComponent;
};

const AppRegistry = {
  registerComponent: (
    componentId: string | ComponentMappingList,
    component?: React.ComponentType
  ) => {
    if (Array.isArray(componentId)) {
      const componentIdList = componentId;
      for (const id of componentIdList) {
        const wrappedComponent = wrapComponent(id, component || DefaultApp);
        const componentProvider = setComponentProvider(wrappedComponent);
        ReactAppRegistry.registerComponent(id, componentProvider);
      }
    } else if (componentId && typeof componentId === 'object') {
      const mappingList = componentId;
      for (const id in mappingList) {
        if (Object.prototype.hasOwnProperty.call(mappingList, id)) {
          const matchedComponent = mappingList[id];
          const wrappedComponent = wrapComponent(id, matchedComponent);
          const componentProvider = setComponentProvider(wrappedComponent);
          ReactAppRegistry.registerComponent(id, componentProvider);
        }
      }
    } else {
      const wrappedComponent = wrapComponent(
        componentId,
        component || DefaultApp
      );
      const componentProvider = setComponentProvider(wrappedComponent);
      ReactAppRegistry.registerComponent(componentId, componentProvider);
    }
  },
};

export default AppRegistry;
