package com.ivonna.navigation.controller;

import android.content.Context;
import android.os.Bundle;
import android.view.View;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.navigation.NavController;
import androidx.navigation.NavDestination;
import androidx.navigation.NavGraph;
import androidx.navigation.NavGraphNavigator;
import androidx.navigation.NavigatorProvider;
import androidx.navigation.fragment.FragmentNavigator;
import androidx.navigation.fragment.NavHostFragment;

import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.ivonna.navigation.navigator.IvonnaFragmentNavigator;

import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;

public class IvonnaNavController {
  private static NavController sNavController;
  private static NavigatorProvider sNavProvider;
  private static NavGraph sNavGraph;
  private static IvonnaFragmentNavigator sFragmentNavigator;
  private static BottomNavigationView sNavView;
  private static Bundle[] sDestinationBundles;

  public static void initNavController(Context context, Fragment hostFragment) {
    sNavController = NavHostFragment.findNavController(hostFragment);
    sNavProvider = sNavController.getNavigatorProvider();
    sFragmentNavigator = new IvonnaFragmentNavigator(context, hostFragment.getChildFragmentManager(), hostFragment.getId());
    sNavProvider.addNavigator(sFragmentNavigator);

    sNavController.addOnDestinationChangedListener(new NavController.OnDestinationChangedListener() {
      @Override
      public void onDestinationChanged(@NonNull NavController controller, @NonNull NavDestination destination, @Nullable Bundle arguments) {
        if (sNavView != null) {
          Boolean isBottomTab = false;
          for (Bundle item: sDestinationBundles) {
            if (item.getInt("id") == destination.getId()) {
              isBottomTab = true;
            }
          }
          Boolean finalIsBottomTab = isBottomTab;
          runOnUiThread(new Runnable() {
            @Override
            public void run() {
              //???????????????????????????????????????UI???
              if (finalIsBottomTab) {
                sNavView.setVisibility(View.VISIBLE);
              } else {
                sNavView.setVisibility(View.INVISIBLE);
              }
            }
          });
        }
      }
    });
  }

  public static void buildBottomTabs(BottomNavigationView navView, Bundle[] destinationBundles) {
    sNavView = navView;
    sNavGraph = new NavGraph(new NavGraphNavigator(sNavProvider));
    sDestinationBundles = destinationBundles;
    for (int i = 0; i < destinationBundles.length; i++) {
      Bundle item = destinationBundles[i];
      FragmentNavigator.Destination destination = sFragmentNavigator.createDestination();
      destination.setId(item.getInt("id"));
      destination.setClassName(item.getString("className"));
      sNavGraph.addDestination(destination);
      if (i == 0) {
        sNavGraph.setStartDestination(destination.getId());
      }
    }
    // setGraph ???????????? setStartDestination ????????????
    sNavController.setGraph(sNavGraph);
    // ????????????????????? NavigationUI.setupWithNavController ,????????????????????????????????????
    sNavView.setOnNavigationItemSelectedListener(item -> {
      sNavController.navigate(item.getItemId());
      return true;
    });
  }

  public static BottomNavigationView getBottomNavigationView() {
		return sNavView;
	}

  public static NavController getNavController() {
    return sNavController;
  }

  public static NavGraph getNavGraph() {
    return sNavGraph;
  }

  public static IvonnaFragmentNavigator getFragmentNavigator() {
    return sFragmentNavigator;
  }

  public static Bundle[] getDestinationBundles() {
    return sDestinationBundles;
  }
}
