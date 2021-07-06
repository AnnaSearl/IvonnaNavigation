package com.ivonna.navigation.constants;

import android.app.Application;

import com.facebook.react.ReactInstanceManager;

import java.lang.reflect.InvocationTargetException;

public class IvonnaApp {
  private static Application sApplication;

  public static Application getApplication() {
    if (sApplication == null) {
      try {
        sApplication = (Application) Class.forName("android.app.ActivityThread")
          .getMethod("currentApplication")
          .invoke((Object)null, (Object[]) null);
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      }
    }
    return sApplication;
  }

}
