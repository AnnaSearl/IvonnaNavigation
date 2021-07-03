import { NativeModules } from 'react-native';

type IvonnaNavigationType = {
  multiply(a: number, b: number): Promise<number>;
};

const { IvonnaNavigation } = NativeModules;

export default IvonnaNavigation as IvonnaNavigationType;
