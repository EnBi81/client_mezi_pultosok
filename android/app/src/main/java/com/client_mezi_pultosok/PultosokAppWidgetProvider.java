package com.client_mezi_pultosok;

import android.appwidget.AppWidgetProvider;
import android.appwidget.AppWidgetManager;
import android.content.Context;
import android.widget.RemoteViews;
import android.content.SharedPreferences;
import android.app.PendingIntent;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.drawable.GradientDrawable;
import android.graphics.drawable.Drawable;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.Canvas;
import android.content.ComponentName;
import android.os.Handler;
import android.os.Looper;

import com.client_mezi_pultosok.models.WorkingDayModel;

public class PultosokAppWidgetProvider extends AppWidgetProvider {
    public static final String ACTION_WIDGET_CLICK = "com.client_mezi_pultosok.WIDGET_CLICK";
    public static final String ACTION_WIDGET_PRESS = "com.client_mezi_pultosok.WIDGET_PRESS";

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        var pultosokDataSharedPreference = new PultosokDataSharedPreference(context);
        WorkingDayModel today = pultosokDataSharedPreference.getToday();

        for (int appWidgetId : appWidgetIds) {
            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_pultosok);

            if (today != null) {
                views.setTextViewText(R.id.date_text, today.getDayOfWeekString());

                var cikola = today.getCikola();
                views.setTextViewText(R.id.cikola_text_1, cikola.length >= 1 ? cikola[0] : "");
                views.setTextViewText(R.id.cikola_text_2, cikola.length >= 2 ? cikola[1] : "");
                views.setTextViewText(R.id.cikola_text_3, cikola.length >= 3 ? cikola[2] : "");

                var doborgaz = today.getDoborgaz();
                views.setTextViewText(R.id.doborgaz_text_1, doborgaz.length >= 1 ? doborgaz[0] : "");
                views.setTextViewText(R.id.doborgaz_text_2, doborgaz.length >= 2 ? doborgaz[1] : "");
                views.setTextViewText(R.id.doborgaz_text_3, doborgaz.length >= 3 ? doborgaz[2] : "");

            } else {
                views.setTextViewText(R.id.date_text, "No data for today");

                views.setTextViewText(R.id.cikola_text_1, "-");
                views.setTextViewText(R.id.cikola_text_2, "");
                views.setTextViewText(R.id.cikola_text_3, "");

                views.setTextViewText(R.id.doborgaz_text_1, "-");
                views.setTextViewText(R.id.doborgaz_text_2, "");
                views.setTextViewText(R.id.doborgaz_text_3, "");
            }


            // Launch app on click
            {
                Intent intent = new Intent(context, MainActivity.class);
                PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
                views.setOnClickPendingIntent(R.id.widget_content, pendingIntent);
            }

            // Update widget on header click
            {
                // Create an Intent to broadcast the custom press action
                Intent pressIntent = new Intent(context, PultosokAppWidgetProvider.class);
                pressIntent.setAction(ACTION_WIDGET_PRESS);
                pressIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, appWidgetId);  // Pass the widget ID
                PendingIntent pressPendingIntent = PendingIntent.getBroadcast(context, 0, pressIntent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);

                // Set the click handler to trigger the press and release broadcasts
                views.setOnClickPendingIntent(R.id.widget_header, pressPendingIntent);
            }

            appWidgetManager.updateAppWidget(appWidgetId, views);
        }
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);

        String intentAction = intent.getAction();
        if (ACTION_WIDGET_PRESS.equals(intentAction)) {
            int appWidgetId = intent.getIntExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, AppWidgetManager.INVALID_APPWIDGET_ID);
            if (appWidgetId != AppWidgetManager.INVALID_APPWIDGET_ID) {
                updateWidgetOnPress(context, appWidgetId);
            }

            Handler handler = new Handler(Looper.getMainLooper());
            handler.postDelayed(() -> {
                AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
                ComponentName thisAppWidget = new ComponentName(context.getPackageName(), getClass().getName());
                int[] appWidgetIds = appWidgetManager.getAppWidgetIds(thisAppWidget);
                onUpdate(context, appWidgetManager, appWidgetIds);
            }, 500);
        }
    }

    private void updateWidgetOnPress(Context context, int appWidgetId) {
        AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_pultosok);

        views.setTextViewText(R.id.date_text, "Reloading...");

        views.setTextViewText(R.id.cikola_text_1, ".");
        views.setTextViewText(R.id.cikola_text_2, "..");
        views.setTextViewText(R.id.cikola_text_3, "...");

        views.setTextViewText(R.id.doborgaz_text_1, ".");
        views.setTextViewText(R.id.doborgaz_text_2, "..");
        views.setTextViewText(R.id.doborgaz_text_3, "...");

        appWidgetManager.updateAppWidget(appWidgetId, views);
    }



}
