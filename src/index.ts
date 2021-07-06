import IvonnaNavigation from './Navigation';
import IvonnaStore from './Store';

export const Navigation = new IvonnaNavigation();

const storeInstance = new IvonnaStore();

export const Store = storeInstance.getStoreManager();

export { default as Provider } from './Provider';

export { default as createContainer } from './CreateContainer';

export { default as Container } from './Container';

export { default as AppRegistry } from './AppRegistry';

export { default as Stack } from './stack';
