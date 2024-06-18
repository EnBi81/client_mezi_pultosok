package com.client_mezi_pultosok.utils;

import android.content.Context;
import android.content.res.Configuration;

public class ThemeUtils {
    public static boolean isDarkTheme(Context context) {
        int currentNightMode = context.getResources().getConfiguration().uiMode
                & Configuration.UI_MODE_NIGHT_MASK;
        return currentNightMode == Configuration.UI_MODE_NIGHT_YES;
    }
}