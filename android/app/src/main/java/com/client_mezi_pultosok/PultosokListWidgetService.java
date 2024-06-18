package com.client_mezi_pultosok;

import android.content.Intent;
import android.widget.RemoteViewsService;

public class PultosokListWidgetService extends RemoteViewsService {
    @Override
    public RemoteViewsFactory onGetViewFactory(Intent intent) {
        return new PultosokListRemoteViewsFactory(this.getApplicationContext(), intent);
    }
}
