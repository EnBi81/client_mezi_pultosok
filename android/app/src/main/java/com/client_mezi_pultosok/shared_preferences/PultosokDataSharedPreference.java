package com.client_mezi_pultosok.shared_preferences;

import android.content.SharedPreferences;
import android.content.Context;

import java.io.IOException;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Calendar;
import java.util.Locale;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.client_mezi_pultosok.models.WorkingDayModel;

public class PultosokDataSharedPreference {
    private static final String PREFERENCES_NAME = "com.client_mezi_pultosok.PultosokSharedPreferences";
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSX");

    private final SharedPreferences sharedPreferences;

    public PultosokDataSharedPreference(Context context){
        this.sharedPreferences = context.getSharedPreferences(PREFERENCES_NAME, Context.MODE_PRIVATE);
    }

    public WorkingDayModel getToday(){
        String value = sharedPreferences.getString("apiData", "");
        WorkingDayModel[] data = parseWorkingDayModel(value);
        return getTodayWorkingDayModel(data);
    }

    public List<WorkingDayModel> getFromToday(int amount){
        String value = sharedPreferences.getString("apiData", "");
        WorkingDayModel[] data = parseWorkingDayModel(value);
        return filterAndLimitItems(data, amount);
    }

    private static WorkingDayModel[] parseWorkingDayModel(String text) {
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            return objectMapper.readValue(text, WorkingDayModel[].class);
        } catch (IOException e) {
            e.printStackTrace();
            return new WorkingDayModel[0];
        }
    }

    private static WorkingDayModel getTodayWorkingDayModel(WorkingDayModel[] data) {
        LocalDate today = LocalDate.now();

        for (WorkingDayModel workingDay : data) {
            ZonedDateTime workingDayDate = ZonedDateTime.parse(workingDay.getDate(), formatter);
            if (workingDayDate.toLocalDate().equals(today)) {
                return workingDay;
            }
        }

        return null;
    }

    private List<WorkingDayModel> filterAndLimitItems(WorkingDayModel[] data, int maxDays) {
        LocalDate today = LocalDate.now();
        List<WorkingDayModel> filteredItems = new ArrayList<>();

        for (WorkingDayModel workingDay : data) {
            if(filteredItems.size() >= maxDays)
                break;

            ZonedDateTime workingDayDate = ZonedDateTime.parse(workingDay.getDate(), formatter);

            if(workingDayDate.toLocalDate().compareTo(today) < 0)
                continue;

            filteredItems.add(workingDay);
        }

        return filteredItems;
    }
}