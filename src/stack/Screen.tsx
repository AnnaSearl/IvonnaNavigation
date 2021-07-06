import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StackContainer } from './Navigator';

export interface ScreenProps {
  name: string;
  component: React.ComponentType<any>;
}

const Screen: React.FC<ScreenProps> = (props) => {
  const { name, component } = props;

  const ScreenComponent = component;

  const { stackValue } = StackContainer.useContainer();

  return stackValue?.initialRouteName === name ? (
    <View style={styles.screen}>
      <ScreenComponent
        navigation={{}}
        route={{ params: stackValue?.initialRouteParams || {} }}
      />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default Screen;
