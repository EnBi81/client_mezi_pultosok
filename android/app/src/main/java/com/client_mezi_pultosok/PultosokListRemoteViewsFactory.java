package com.client_mezi_pultosok;

import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.widget.RemoteViews;
import android.widget.RemoteViewsService;
import android.text.SpannableString;
import android.text.style.StrikethroughSpan;

import java.util.ArrayList;
import java.util.List;

import com.client_mezi_pultosok.models.WorkingDayModel;
import com.client_mezi_pultosok.shared_preferences.PultosokDataSharedPreference;
import com.client_mezi_pultosok.utils.ThemeUtils;

public class PultosokListRemoteViewsFactory implements RemoteViewsService.RemoteViewsFactory {
    private final Context context;
    private final PultosokDataSharedPreference pultosokDataSharedPreference;
    private List<WorkingDayModel> items = new ArrayList<>();

    public PultosokListRemoteViewsFactory(Context context, Intent intent) {
        this.context = context;
        pultosokDataSharedPreference = new PultosokDataSharedPreference(context);
    }

    @Override
    public void onCreate() {
        // Initial data load
        loadDataFromPreferences();
    }

    @Override
    public void onDataSetChanged() {
        // Load data again when dataset is changed
        loadDataFromPreferences();
    }

    @Override
    public void onDestroy() {
        items.clear();
    }

    @Override
    public int getCount() {
        return items.size();
    }

    @Override
    public RemoteViews getViewAt(int position) {
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_pultosok_list_item);
        var item = items.get(position);
        var isDarkMode = ThemeUtils.isDarkTheme(context);

        views.setTextViewText(R.id.widget_item_text_date, item.getDateStringShort());
        views.setTextViewText(R.id.widget_item_text_day_of_week, item.getDayOfWeekString());

        var cikola = item.getCikola();
        if(cikola.length > 0) {
            String cikolaText = "Cikola: " + String.join(", ", item.getCikola());
            views.setTextViewText(R.id.widget_item_text_cikola, cikolaText);
        }
        else {
            SpannableString strikethroughText = new SpannableString("Cikola");
            strikethroughText.setSpan(new StrikethroughSpan(), 0, strikethroughText.length(), 0);
            views.setTextViewText(R.id.widget_item_text_cikola, strikethroughText);
        }

        var doborgaz = item.getDoborgaz();
        if(doborgaz.length > 0) {
            String doborgazText = "Doborgaz: " + String.join(", ", item.getDoborgaz());
            views.setTextViewText(R.id.widget_item_text_doborgaz, doborgazText);
        }
        else {
            SpannableString strikethroughText = new SpannableString("Doborgaz");
            strikethroughText.setSpan(new StrikethroughSpan(), 0, strikethroughText.length(), 0);
            views.setTextViewText(R.id.widget_item_text_doborgaz, strikethroughText);
        }


        // Set text colors
        int textColor = isDarkMode ? Color.parseColor("#ededed") : Color.parseColor("#242424");
        views.setTextColor(R.id.widget_item_text_date, textColor);
        views.setTextColor(R.id.widget_item_text_day_of_week, textColor);
        views.setTextColor(R.id.widget_item_text_cikola, textColor);
        views.setTextColor(R.id.widget_item_text_doborgaz, textColor);

        // Set background color
        int bgColor = isDarkMode ? Color.parseColor("#242424") : Color.parseColor("#ededed");
        views.setInt(R.id.widget_pultosok_list_item_bg, "setBackgroundColor", bgColor);

        return views;
    }

    @Override
    public RemoteViews getLoadingView() {
        return null;
    }

    @Override
    public int getViewTypeCount() {
        return 1;
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public boolean hasStableIds() {
        return true;
    }


    private void loadDataFromPreferences() {
        List<WorkingDayModel> data = pultosokDataSharedPreference.getFromToday(14);

        items.clear();
        if (data != null) {
            for (WorkingDayModel item : data) {
                items.add(item);
            }
        }
    }
}
