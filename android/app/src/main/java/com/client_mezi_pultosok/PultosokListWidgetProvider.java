package com.client_mezi_pultosok;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.widget.RemoteViews;

public class PultosokListWidgetProvider extends AppWidgetProvider {

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        for (int appWidgetId : appWidgetIds) {
            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_pultosok_list);

            Intent intent = new Intent(context, PultosokListWidgetService.class);
            views.setRemoteAdapter(R.id.widget_list, intent);

            appWidgetManager.updateAppWidget(appWidgetId, views);
        }
    }
}
