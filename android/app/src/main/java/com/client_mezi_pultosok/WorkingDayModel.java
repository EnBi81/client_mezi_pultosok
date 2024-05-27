package com.client_mezi_pultosok;

public class WorkingDayModel {
    private String date;
    private String dateStringShort;
    private String dayOfWeekString;
    private Boolean isNew;
    private Long isNewDateRegistered; // Use Long to allow null values
    private String[] cikola;
    private String[] doborgaz;

    // Default constructor
    public WorkingDayModel() {}

    // Parameterized constructor
    public WorkingDayModel(String date, String dateStringShort, String dayOfWeekString, boolean isNew, Long isNewDateRegistered, String[] cikola, String[] doborgaz) {
        this.date = date;
        this.dateStringShort = dateStringShort;
        this.dayOfWeekString = dayOfWeekString;
        this.isNew = isNew;
        this.isNewDateRegistered = isNewDateRegistered;
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

    public boolean getIsNew() {
        return isNew;
    }

    public void setIsNew(boolean isNew) {
        this.isNew = isNew;
    }

    public Long getIsNewDateRegistered() {
        return isNewDateRegistered;
    }

    public void setIsNewDateRegistered(Long isNewDateRegistered) {
        this.isNewDateRegistered = isNewDateRegistered;
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
