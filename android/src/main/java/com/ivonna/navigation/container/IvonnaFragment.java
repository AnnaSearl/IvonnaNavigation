package com.ivonna.navigation.container;

import android.content.Context;
import android.graphics.Color;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.ivonnanavigation.utils.IvonnaApp;

public class IvonnaFragment extends Fragment {

  public @Nullable Bundle properties;
  public String pageName;

  private ReactRootView mReactRootView;
  protected ReactInstanceManager mReactInstanceManager;

  public IvonnaFragment() {
  }

  public IvonnaFragment(String pageName, @Nullable Bundle properties) {
    this.pageName = pageName;
    this.properties = properties;
  }

  @Override
  public void onAttach(Context context) {
    super.onAttach(context);
    mReactRootView = new ReactRootView(context);
    mReactRootView.setBackgroundColor(Color.parseColor("#FFFFFF"));
    mReactInstanceManager = IvonnaApp.getReactInstanceManager();
  }

  @Override
  public View onCreateView(LayoutInflater inflater, ViewGroup group, Bundle savedInstanceState) {
    if (getArguments() != null && getArguments().getString("pageName") != null) {
      pageName = getArguments().getString("pageName");
      properties = getArguments().getBundle("properties");
    }
    mReactRootView.startReactApplication(mReactInstanceManager, pageName, properties);
    return mReactRootView;
  }

  @Override
  public void onDestroy() {
    super.onDestroy();
    mReactRootView.unmountReactApplication();
  }

  public void setAppProperties(@Nullable Bundle appProperties) {
    this.properties = appProperties;
    mReactRootView.setAppProperties(this.properties);
  }

  @Override
  public void onDetach() {
    super.onDetach();
    mReactRootView.unmountReactApplication();
  }

}
