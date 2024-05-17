package com.client_mezi_pultosok;

import android.appwidget.AppWidgetProvider;
import android.appwidget.AppWidgetManager;
import android.content.Context;
import android.widget.RemoteViews;
import android.content.SharedPreferences;
import com.fasterxml.jackson.databind.ObjectMapper;
import android.app.PendingIntent;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

import java.io.IOException;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

public class PultosokAppWidgetProvider extends AppWidgetProvider {
    private static final String PREFERENCES_NAME = "com.client_mez_pultosok.PultosokSharedPreferences";
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSX");

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        SharedPreferences sharedPreferences = context.getSharedPreferences(PREFERENCES_NAME, Context.MODE_PRIVATE);

        String value = sharedPreferences.getString("apiData", "");
        WorkingDayModel[] data = parseWorkingDayModel(value);
        WorkingDayModel today = getTodayWorkingDayModel(data);

        for (int appWidgetId : appWidgetIds) {
            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_pultosok);


            if (today != null) {
                views.setTextViewText(R.id.date_text, today.getDateStringShort() + " " + today.getDateStringLong());

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

            // Create an Intent to launch MainActivity
            Intent intent = new Intent(context, MainActivity.class);
            PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);

            // Set the click handler to open MainActivity
            views.setOnClickPendingIntent(R.id.widget_layout, pendingIntent);

            appWidgetManager.updateAppWidget(appWidgetId, views);
        }
    }

    private WorkingDayModel[] parseWorkingDayModel(String text) {
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            return objectMapper.readValue(text, WorkingDayModel[].class);
        } catch (IOException e) {
            e.printStackTrace();
            return new WorkingDayModel[0];
        }
    }

    private WorkingDayModel getTodayWorkingDayModel(WorkingDayModel[] data) {
        LocalDate today = LocalDate.now();

        for (WorkingDayModel workingDay : data) {
            ZonedDateTime workingDayDate = ZonedDateTime.parse(workingDay.getDate(), formatter);
            if (workingDayDate.toLocalDate().equals(today)) {
                return workingDay;
            }
        }

        return null;
    }
}
