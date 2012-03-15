package com.jgrindall.android.iching;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.Display;
import android.view.Menu;
import android.view.MenuItem;
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
        if(width>height){
        	int w = width;
        	width = height;
        	height = w;
        }
        // calculate target scale (only dealing with portrait orientation)
        double globalScaleW = Math.ceil( ( width / ORIG_APP_W ) * 100 );
        double globalScaleH = Math.ceil( ( height / ORIG_APP_H ) * 100 );
        double globalScale = Math.min(globalScaleW, globalScaleH);
        // set some defaults on the web view
        this.appView.getSettings().setBuiltInZoomControls( false );
        this.appView.getSettings().setSupportZoom( false );
        this.appView.getSettings().setGeolocationEnabled( false );
        this.appView.getSettings().setLightTouchEnabled( true );
        this.appView.getSettings().setRenderPriority( RenderPriority.HIGH );
        
        // set the scale
        this.appView.setInitialScale( (int)globalScale );
        
    }
    
    @Override
	public boolean onCreateOptionsMenu(Menu m){
		MenuItem m0 = m.add(0,Menu.FIRST,Menu.FIRST,"Help");
		m0.setIcon(R.drawable.ic_menu_help);
		return super.onCreateOptionsMenu(m);
	}
    
    @Override
    public boolean onOptionsItemSelected(MenuItem item){
    	if(item.getItemId()==Menu.FIRST){
    		Intent intent = new Intent(this, HelpActivity.class);
            startActivity(intent);
            return true;
    	}
    	return true;
    }
    
    
    
}