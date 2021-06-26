import { NativeModules } from 'react-native';

type NavigationType = {
  multiply(a: number, b: number): Promise<number>;
};

const { Navigation } = NativeModules;

export default Navigation as NavigationType;
