package com.ivonna.navigation.manager;

import android.app.Activity;
import android.app.Application;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactPackage;
import com.facebook.react.common.LifecycleState;

import java.util.List;

public class IvonnaInstanceManager {
	private static IvonnaInstanceManager __manager;

	public static IvonnaInstanceManager createSingleManager(Application application, Activity activity, List<ReactPackage> packages, Boolean useDeveloperSupport) {
		if (__manager == null) {
			__manager = new IvonnaInstanceManager(application, activity, packages, useDeveloperSupport);
		}
		return __manager;
	}

	public static IvonnaInstanceManager sharedManager() {
		return __manager;
	}

	private ReactInstanceManager mReactInstanceManager;
	private Application mApplication;
	private Activity mActivity;

	protected IvonnaInstanceManager(Application application, Activity activity, List<ReactPackage> packages, Boolean useDeveloperSupport) {
		mApplication = application;
		mActivity = activity;
		mReactInstanceManager = ReactInstanceManager.builder()
				.setApplication(application)
				.setCurrentActivity(activity)
				.setBundleAssetName("index.android.bundle")
				.setJSMainModulePath("index")
				.addPackages(packages) // 这个千万不能漏掉
				.setUseDeveloperSupport(useDeveloperSupport)
				.setInitialLifecycleState(LifecycleState.RESUMED)
				.build();
	}

	public ReactInstanceManager getReactInstanceManager() {
		return mReactInstanceManager;
	}

	public Application getApplication() {
		return mApplication;
	}

	public Activity getActivity() {
		return mActivity;
	}
}
