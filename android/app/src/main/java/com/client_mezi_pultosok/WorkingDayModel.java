package com.client_mezi_pultosok;

public class WorkingDayModel {
    private String date;
    private String dateStringShort;
    private String dayOfWeekString;
    private Long lastModifiedDate;
    private Long markedAsReadTime;
    private String[] cikola;
    private String[] doborgaz;

    // Default constructor
    public WorkingDayModel() {}

    // Parameterized constructor
    public WorkingDayModel(String date, String dateStringShort, String dayOfWeekString, String[] cikola, String[] doborgaz) {
        this.date = date;
        this.dateStringShort = dateStringShort;
        this.dayOfWeekString = dayOfWeekString;
        this.cikola = cikola;
        this.doborgaz = doborgaz;
    }

    // Getters and setters
    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDateStringShort() {
        return dateStringShort;
    }

    public void setDateStringShort(String dateStringShort) {
        this.dateStringShort = dateStringShort;
    }

    public String getDayOfWeekString() {
        return dayOfWeekString;
    }

    public void setDayOfWeekString(String dayOfWeekString) {
        this.dayOfWeekString = dayOfWeekString;
    }

    public Long getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(Long lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public Long getMarkedAsReadTime() {
        return markedAsReadTime;
    }

    public void setMarkedAsReadTime(Long markedAsReadTime) {
        this.markedAsReadTime = markedAsReadTime;
    }

    public String[] getCikola() {
        return cikola;
    }

    public void setCikola(String[] cikola) {
        this.cikola = cikola;
    }

    public String[] getDoborgaz() {
        return doborgaz;
    }

    public void setDoborgaz(String[] doborgaz) {
        this.doborgaz = doborgaz;
    }
}
