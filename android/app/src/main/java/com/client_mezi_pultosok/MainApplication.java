package com.client_mezi_pultosok;

import com.rnfs.RNFSPackage;
import android.app.Application;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.os.Build;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactHost;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactHost;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.soloader.SoLoader;
import in.sriraman.sharedpreferences.RNSharedPreferencesReactPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;

import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost reactNativeHost =
            new DefaultReactNativeHost(this) {
                @Override
                public List<ReactPackage> getPackages() {
                    List<ReactPackage> packages = new PackageList(this).getPackages();
                    // Packages that cannot be autolinked yet can be added manually here, for example:
                    // packages.add(new RNSharedPreferencesReactPackage());
                    packages.add(new InstallModulePackage());
                    return packages;
                }

                @Override
                public String getJSMainModuleName() {
                    return "index";
                }

                @Override
                public boolean getUseDeveloperSupport() {
                    return BuildConfig.DEBUG;
                }

                @Override
                public boolean isNewArchEnabled() {
                    return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
                }

                @Override
                public Boolean isHermesEnabled() {
                    return BuildConfig.IS_HERMES_ENABLED;
                }
            };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return reactNativeHost;
    }

    @Override
    public ReactHost getReactHost() {
        return DefaultReactHost.getDefaultReactHost(getApplicationContext(), reactNativeHost);
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, false);
        if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
            // If you opted-in for the New Architecture, we load the native entry point for this app.
            DefaultNewArchitectureEntryPoint.load();
        }
    }
}
