package com.client_mezi_pultosok;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import android.content.Intent;
import androidx.core.content.FileProvider;
import java.io.File;
import android.net.Uri;
import com.facebook.react.bridge.Promise;
import java.io.StringWriter;
import java.io.PrintWriter;
import android.os.Environment;

public class InstallModule extends ReactContextBaseJavaModule {

    private static String errorMessage = "";
    public InstallModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "InstallModule";
    }

    @ReactMethod
    public void installApk(String apkPath, Promise promise) {
        try{
            File apkFile = new File(apkPath);

            if (!apkFile.exists()) {
                promise.reject("FileNotFound", "APK file does not exist at path: " + apkPath);
                return;
            }

            var reactAppContext = getReactApplicationContext();
            Uri uri = FileProvider.getUriForFile(reactAppContext, reactAppContext.getPackageName() + ".provider", apkFile);

            Intent install = new Intent(Intent.ACTION_VIEW);
            install.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
            install.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            install.setDataAndType(uri, "application/vnd.android.package-archive");

            var currentActivity = getCurrentActivity();
            if (currentActivity != null) {
                currentActivity.startActivity(install);
                promise.resolve("");
            } else {
                promise.reject("Current activity is null");
            }
        }
        catch(Exception e){
            promise.reject(e.toString());
        }
    }
}
