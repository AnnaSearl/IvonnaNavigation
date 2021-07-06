import React, { ReactNode, ReactElement, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CreateContainer from '../CreateContainer';
import { ScreenProps } from './Screen';
import { IvonnaObject } from '../interface';

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getDisplayScreen = (
  childrenArray: Array<Exclude<ReactNode, boolean | null | undefined>>,
  initialRouteName?: string | number
) => {
  let DisplayScreen = <></>;
  if (childrenArray.length <= 0) {
    return DisplayScreen;
  }
  if (childrenArray.length === 1) {
    return childrenArray[0];
  }
  if (childrenArray.length > 1) {
    if (!initialRouteName && initialRouteName !== 0) {
      return childrenArray[0];
    }

    for (let index = 0; index < childrenArray.length; index++) {
      const element = childrenArray[index];
      // 找到和 initialRouteName 匹配的 Screen 并返回它
      if (
        (element as ReactElement<ScreenProps>)?.props?.name === initialRouteName
      ) {
        return element;
      }
    }
    // 走到这里说明没有找到和 initialRouteName 匹配的 Screen,则返回第一个
    return childrenArray[0];
  }
};

function useStack(initialState?: IvonnaObject) {
  const [stackValue, setStackValue] = useState(initialState || {});
  return { stackValue, setStackValue };
}

export const StackContainer = CreateContainer(useStack);

export interface NavigatorProps {
  initialRouteName?: string;
  initialRouteParams?: any;
}

const Navigator: React.FC<NavigatorProps> = (props) => {
  const { children, initialRouteName, initialRouteParams } = props;

  return (
    <StackContainer.Provider
      initialState={{ initialRouteName, initialRouteParams }}
    >
      <View style={styles.navigator}>{children}</View>
    </StackContainer.Provider>
  );
};

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
  },
});

export default Navigator;
