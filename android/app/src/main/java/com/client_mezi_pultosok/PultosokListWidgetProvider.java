package com.client_mezi_pultosok;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.app.PendingIntent;
import android.widget.RemoteViews;
import android.graphics.Color;
import android.content.ComponentName;
import android.os.Handler;
import android.os.Looper;

import com.client_mezi_pultosok.utils.ThemeUtils;

public class PultosokListWidgetProvider extends AppWidgetProvider {

    public static final String ACTION_REFRESH_BUTTON_PRESS = "com.client_mezi_pultosok.ACTION_REFRESH_BUTTON_PRESS";

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        for (int appWidgetId : appWidgetIds) {
            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_pultosok_list);

            {
                Intent intent = new Intent(context, PultosokListWidgetService.class);
                views.setRemoteAdapter(R.id.widget_list, intent);
            }

            var isDarkMode = ThemeUtils.isDarkTheme(context);
            int bgColor = isDarkMode ? Color.parseColor("#303030") : Color.parseColor("#dbdbdb");
            int textColor = isDarkMode ? Color.parseColor("#ededed") : Color.parseColor("#242424");

            views.setTextColor(R.id.widget_pultosok_list_mezi_pultos_garda, textColor);
            views.setInt(R.id.widget_pultosok_list_wrapper, "setBackgroundColor", bgColor);

            views.setInt(R.id.widget_pultosok_list_refresh, "setColorFilter", textColor);
            views.setInt(R.id.widget_pultosok_list_open_app, "setColorFilter", textColor);


            // Launch app on click
            {
                Intent intent = new Intent(context, MainActivity.class);
                PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
                views.setOnClickPendingIntent(R.id.widget_pultosok_list_open_app, pendingIntent);
            }

            // Update widget on header click
            {
                // Create an Intent to broadcast the custom press action
                Intent pressIntent = new Intent(context, PultosokListWidgetProvider.class);
                pressIntent.setAction(ACTION_REFRESH_BUTTON_PRESS);
                pressIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);
                PendingIntent pressPendingIntent = PendingIntent.getBroadcast(context, 0, pressIntent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);

                views.setOnClickPendingIntent(R.id.widget_pultosok_list_refresh, pressPendingIntent);
            }

            views.setEmptyView(R.id.widget_list, R.id.empty_view);

            // update list content
            appWidgetManager.notifyAppWidgetViewDataChanged(appWidgetId, R.id.widget_list);
            appWidgetManager.updateAppWidget(appWidgetId, views);
        }
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);

        String intentAction = intent.getAction();
        if (ACTION_REFRESH_BUTTON_PRESS.equals(intentAction)) {
            AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
            ComponentName thisAppWidget = new ComponentName(context.getPackageName(), getClass().getName());
            int[] appWidgetIds = appWidgetManager.getAppWidgetIds(thisAppWidget);

            onUpdate(context, appWidgetManager, appWidgetIds);

            int appWidgetId = intent.getIntExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, AppWidgetManager.INVALID_APPWIDGET_ID);
            if (appWidgetId != AppWidgetManager.INVALID_APPWIDGET_ID) {
                changeImageButtonSrc(context, appWidgetId);
            }

        }
    }

    private void changeImageButtonSrc(Context context, int appWidgetId) {
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_pultosok_list);

        views.setImageViewResource(R.id.widget_pultosok_list_refresh, R.drawable.ic_check);

        AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
        appWidgetManager.updateAppWidget(appWidgetId, views);

        Handler handler = new Handler(Looper.getMainLooper());
        handler.postDelayed(() -> {
            views.setImageViewResource(R.id.widget_pultosok_list_refresh, R.drawable.ic_refresh);
            appWidgetManager.updateAppWidget(appWidgetId, views);
        }, 1500);
    }
}
