import { NativeModules } from 'react-native';
import { IvonnaObject } from './interface';

const { IvonnaNavigationBridge } = NativeModules;

type OnPushBeforeType = (componentId: string, params?: IvonnaObject) => boolean;
type OnPushAfterType = (componentId: string, params?: IvonnaObject) => void;

class IvonnaNavigation {
  private onPushBefore?: OnPushBeforeType | null;

  private onPushAfter?: OnPushAfterType | null;

  constructor() {}

  public async push(
    name: string,
    params?: IvonnaObject,
    animated?: boolean,
    callback?: () => any
  ) {
    if (this.onPushBefore) {
      const isContinue = await this.onPushBefore?.(name, params);
      if (isContinue === false) {
        return;
      }
    }

    if (arguments.length === 4) {
      IvonnaNavigationBridge.push(name, params, animated, callback);
    }
    if (arguments.length === 3) {
      IvonnaNavigationBridge.push(name, params, animated, () => {});
    }
    if (arguments.length === 2) {
      IvonnaNavigationBridge.push(name, params, true, () => {});
    }
    if (arguments.length === 1) {
      IvonnaNavigationBridge.push(name, null, true, () => {});
    }

    if (this.onPushAfter) {
      this.onPushAfter?.(name, params);
    }
  }

  public setOnPushBefore(value: OnPushBeforeType) {
    this.onPushBefore = value;
  }

  public setonPushAfter(value: OnPushAfterType) {
    this.onPushAfter = value;
  }

  public pop(animated?: boolean) {
    if (typeof animated === 'boolean') {
      IvonnaNavigationBridge.pop(animated);
    } else {
      IvonnaNavigationBridge.pop(true);
    }
  }

  public navigate(name: string, params?: IvonnaObject, animated?: boolean) {
    this.push(name, params, animated);
  }

  public goBack() {
    this.pop();
  }

  public switchTab(index: number) {
    IvonnaNavigationBridge.switchTab(index);
  }
}

export default IvonnaNavigation;
