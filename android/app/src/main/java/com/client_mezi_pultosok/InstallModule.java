package com.client_mezi_pultosok;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import android.content.Intent;
import androidx.core.content.FileProvider;
import java.io.File;
import android.net.Uri;
import android.util.Log;
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
            //File apkFile = new File(apkPath);
            if (!apkFile.exists()) {
                promise.reject("FileNotFound", "APK file does not exist at path: " + apkPath);
                return;
            }

            Uri uri = FileProvider.getUriForFile(getReactApplicationContext(), getReactApplicationContext().getPackageName() + ".provider", apkFile);

            Intent install = new Intent(Intent.ACTION_VIEW);
            install.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
            install.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            install.setDataAndType(uri, "application/vnd.android.package-archive");

            if (getCurrentActivity() != null) {
                getCurrentActivity().startActivity(install);
                promise.resolve("");
            } else {
                Log.e(getName(), "Current activity is null");
                promise.reject("Current activity is null");
            }
        }
        catch(Exception e){
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            String sStackTrace = sw.toString(); // stack trace as a string

            errorMessage = e.toString() + " " + sStackTrace + " apk path: " + apkPath;
            promise.reject(errorMessage);
        }
    }
}
