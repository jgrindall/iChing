package com.jgrindall.android.iching;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.view.Display;
import android.webkit.WebSettings.RenderPriority;
import android.view.WindowManager;
import com.phonegap.*;

public class IChingActivity extends DroidGap {
	
	 protected float ORIG_APP_W = 480;
	 protected float ORIG_APP_H = 700;
	
	@Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/coins.html");
        //super.init();
        initWindow();
    }
	
    private void initWindow(){
    	
    	this.appView.setBackgroundColor(0xFFFFFF);
        this.appView.setHorizontalScrollBarEnabled(false);
        this.appView.setHorizontalScrollbarOverlay(false);
        this.appView.setVerticalScrollBarEnabled(false);
        this.appView.setVerticalScrollbarOverlay(false);
        
        // get actual screen size
        Display display = ((WindowManager) getSystemService(Context.WINDOW_SERVICE)).getDefaultDisplay();
        int width = display.getWidth(); 
        int height = display.getHeight(); 
        
        // calculate target scale (only dealing with portrait orientation)
        double globalScale = Math.ceil( ( width / ORIG_APP_W ) * 100 );
       
        // set some defaults on the web view
        this.appView.getSettings().setBuiltInZoomControls( false );
        this.appView.getSettings().setSupportZoom( false );
        this.appView.getSettings().setGeolocationEnabled( false );
        this.appView.getSettings().setLightTouchEnabled( true );
        this.appView.getSettings().setRenderPriority( RenderPriority.HIGH );
        
        // set the scale
        this.appView.setInitialScale( (int)globalScale );
        
       
        
    }
}