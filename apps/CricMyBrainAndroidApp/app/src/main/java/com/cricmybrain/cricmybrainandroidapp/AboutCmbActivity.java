package com.cricmybrain.cricmybrainandroidapp;

import android.app.Activity;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.Html;
import android.view.Gravity;
import android.webkit.WebView;
import android.widget.TextView;

public class AboutCmbActivity extends Activity {


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_about_cmb);

        String htmlText = " %s ";
        String myData = getResources().getString(R.string.about_cmb_text) +
                "Version Name = "+ BuildConfig.VERSION_NAME +
                "Version Code = "+Integer.toString(BuildConfig.VERSION_CODE);


                String text = "<html><body>"
                         + "<p align=\"justify\">"
                         + getString(R.string.about_cmb_text)
                        + "</p> "
                        + "<p align=\"justify\">"
                        + "Version Name = "+ BuildConfig.VERSION_NAME
                        + "</p> "
                        + "<p align=\"justify\">"
                        + "Version Name = "+ BuildConfig.VERSION_CODE
                        + "</p> "
                        + "</body></html>";

        WebView webView = (WebView) findViewById(R.id.webview_id);
        webView.loadData(text,"text/html","utf-8");
    }
}
