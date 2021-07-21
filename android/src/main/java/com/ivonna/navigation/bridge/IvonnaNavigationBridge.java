package com.ivonna.navigation.bridge;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.navigation.NavController;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.module.annotations.ReactModule;
import com.ivonna.navigation.container.IvonnaActivity;
import com.ivonna.navigation.controller.IvonnaNavController;
import com.ivonna.navigation.manager.IvonnaInstanceManager;

@ReactModule(name = IvonnaNavigationBridge.NAME)
public class IvonnaNavigationBridge extends ReactContextBaseJavaModule {
	public static final String NAME = "IvonnaNavigationBridge";

	public IvonnaNavigationBridge(ReactApplicationContext reactContext) {
		super(reactContext);
	}

	@Override
	@NonNull
	public String getName() {
		return NAME;
	}

	@ReactMethod
	public void push(String name, ReadableMap params, Boolean animated, Callback callback) {
		Bundle bundle = new Bundle();
		if (params != null) {
			Bundle paramsBundle = new Bundle();
			paramsBundle = Arguments.toBundle(params);
			bundle.putBundle("params", paramsBundle);
		}
		Activity currentActivity = getCurrentActivity();
		IvonnaActivity.startMe(currentActivity, name, bundle);
	}

	@ReactMethod
	public void pop(Boolean animated) {
		Activity currentActivity = getCurrentActivity();
		currentActivity.finish();
	}

	@ReactMethod
	public void switchTab(int index) {
		Activity currentActivity = getCurrentActivity();
		Activity FirstActivity = IvonnaInstanceManager.sharedManager().getActivity();
		Intent intent= new Intent(currentActivity, FirstActivity.getClass());
		intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
		currentActivity.startActivity(intent);
		NavController navController = IvonnaNavController.getNavController();
		Bundle[] destinationBundles = IvonnaNavController.getDestinationBundles();
		navController.navigate(destinationBundles[index].getInt("id"));
	}

}
