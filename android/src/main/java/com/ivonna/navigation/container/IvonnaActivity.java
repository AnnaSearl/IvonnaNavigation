package com.ivonna.navigation.container;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.KeyEvent;

import androidx.appcompat.app.AppCompatActivity;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.ivonnanavigation.utils.IvonnaApp;


public class IvonnaActivity extends AppCompatActivity implements DefaultHardwareBackBtnHandler {
    public static final String EXTRA_PAGE_NAME = "extra_page_name";
    public static final String EXTRA_PAGE_PROPERTIES = "extra_page_properties";

    private ReactRootView mReactRootView;
    private ReactInstanceManager mReactInstanceManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mReactRootView = new ReactRootView(this);
        mReactInstanceManager = IvonnaApp.getReactInstanceManager();

        String pageName = getIntent().getStringExtra(EXTRA_PAGE_NAME);
        Bundle pageProperties = getIntent().getBundleExtra(EXTRA_PAGE_PROPERTIES);
        mReactRootView.startReactApplication(mReactInstanceManager, pageName, pageProperties);
        setContentView(mReactRootView);
    }

    public static void startMe(Context context, String pageName) {
        Intent intent = new Intent(context, IvonnaActivity.class);
        intent.putExtra(IvonnaActivity.EXTRA_PAGE_NAME, pageName);
        context.startActivity(intent);
    }

    public static void startMe(Context context, Bundle properties) {
        Intent intent = new Intent(context, IvonnaActivity.class);
        intent.putExtra(IvonnaActivity.EXTRA_PAGE_PROPERTIES, properties);
        context.startActivity(intent);
    }

    public static void startMe(Context context, String pageName, Bundle extra) {
        Intent intent = new Intent(context, IvonnaActivity.class);
        intent.putExtra(IvonnaActivity.EXTRA_PAGE_NAME, pageName);
        intent.putExtras(extra);
        context.startActivity(intent);
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }

    @Override
    protected void onPause() {
        super.onPause();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostPause(this);
        }
    }

    @Override
    protected void onResume() {
        super.onResume();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostResume(this, this);
        }
    }

    @Override
    public void onBackPressed() {
        if (mReactInstanceManager != null) {
            mReactInstanceManager.onBackPressed();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostDestroy(this);
        }
        if (mReactRootView != null) {
            mReactRootView.unmountReactApplication();
        }
    }

    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_MENU && mReactInstanceManager != null) {
            mReactInstanceManager.showDevOptionsDialog();
            return true;
        }
        return super.onKeyUp(keyCode, event);
    }

}
