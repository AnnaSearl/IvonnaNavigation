package com.ivonna.navigation;

import android.app.Activity;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.navigation.ActivityNavigator;
import androidx.navigation.NavController;
import androidx.navigation.NavGraph;
import androidx.navigation.fragment.FragmentNavigator;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.module.annotations.ReactModule;
import com.ivonna.navigation.container.IvonnaFragment;
import com.ivonna.navigation.container.IvonnaActivity;
import com.ivonna.navigation.controller.IvonnaNavController;

import java.util.Iterator;
import java.util.Set;

@ReactModule(name = NavigationModule.NAME)
public class NavigationModule extends ReactContextBaseJavaModule {
	public static final String NAME = "IvonnaNavigationBridge";

	public NavigationModule(ReactApplicationContext reactContext) {
		super(reactContext);
	}

	@Override
	@NonNull
	public String getName() {
		return NAME;
	}

	@ReactMethod
	public void push(String name, ReadableMap params, Boolean animated, Callback callback) {
//		NavController navController = IvonnaNavController.getNavController();
//		NavGraph navGraph = IvonnaNavController.getNavGraph();
//		FragmentNavigator fragmentNavigator = IvonnaNavController.getFragmentNavigator();
//		FragmentNavigator.Destination destination = fragmentNavigator.createDestination();
//		destination.setId(7000000);
//		destination.setClassName(RNBaseFragment.class.getCanonicalName());
//		navGraph.addDestination(destination);
//
//		Bundle bundle = new Bundle();
//		bundle.putString("pageName", name);
//		Bundle propertiesBundle = new Bundle();
//		bundle.putBundle("properties", propertiesBundle);
//		if (params != null) {
//			ReadableMapKeySetIterator iter = params.keySetIterator();
//			while (iter.hasNextKey()) {
//				String key = iter.nextKey();
//				propertiesBundle.putString(key, params.getString(key));
//			}
//		}
//		navController.navigate(destination.getId(), bundle);

		Activity currentActivity = getCurrentActivity();
		IvonnaActivity.startMe(currentActivity, name);
	}

	@ReactMethod
	public void pop(Boolean animated) {
//		NavController navController = IvonnaNavController.getNavController();
//		navController.popBackStack();

		Activity currentActivity = getCurrentActivity();
		currentActivity.finish();
	}

}
