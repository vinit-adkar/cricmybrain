package com.cricmybrain.cricmybrainandroidapp;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.graphics.Bitmap;
import android.os.Handler;
import android.util.Log;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

/**
 * Created by Admin on 4/10/2016.
 */
public class MyWebViewClient extends WebViewClient{
    final static String tag = "MyWebViewClient";
    final static int timeoutVal = 5000; // microseconds
    private ProgressDialog mProgDialog;
    private Activity mParentActivity;
    boolean mTimeout = true;
    boolean mPageStartedLoading = false;

    MyWebViewClient(Activity parentActivity){
        mParentActivity  = parentActivity;
        mProgDialog = ProgressDialog.show(mParentActivity,"Loading","Please wait...",true);
        mProgDialog.setCancelable(false);
    }

    @Override
    public boolean shouldOverrideUrlLoading(WebView view, String url) {
        Log.d(tag,"shouldOverrideUrlLoading");
        mProgDialog.show();
        view.loadUrl(url);
        return true;
    }

    @Override
    public void onPageStarted(WebView view, String url, Bitmap favicon) {
        final WebView lView = view;
        Log.d(tag,"onPageStarted");
        if(!mPageStartedLoading){
            Handler handler = new Handler();
            Runnable run = new Runnable() {
                @Override
                public void run() {

                    if(mTimeout){
                        Log.e(tag,"Connection Timed out. Whoops! Something went wrong. Please try again later....");
                        Toast.makeText(mParentActivity,"Connection Timed out. Whoops! Something went wrong. Please try again later.",Toast.LENGTH_SHORT).show();
                        mProgDialog.dismiss();
                        lView.stopLoading();
                        lView.destroy();
                        mParentActivity.finish();
                    }
                }
            };
            handler.postDelayed(run,timeoutVal);
        }
        mPageStartedLoading = true;
    }

    @Override
    public void onPageFinished(WebView view, String url) {
        Log.d(tag,"onPageFinished");
        mProgDialog.dismiss();
        mTimeout = false;
        mPageStartedLoading = false;
    }

    @Override
    public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
        Log.e(tag,"Error while connecting to the server .....");
        Toast.makeText(mParentActivity,"Error while connecting to the server .....",Toast.LENGTH_LONG).show();
        mProgDialog.dismiss();
        view.stopLoading();
        view.destroy();
        mParentActivity.finish();
    }

    @Override
    public void onReceivedError(WebView view, int errorCode, String description, String failingUrl){
        Log.e(tag,"Error while connecting to the server .....");
        Toast.makeText(mParentActivity,"Error while connecting to the server .....",Toast.LENGTH_LONG).show();
        mProgDialog.dismiss();
        view.stopLoading();
        view.destroy();
        mParentActivity.finish();
    }

    @Override
    public void onReceivedHttpError(WebView view, WebResourceRequest request, WebResourceResponse errorResponse) {
        Log.e(tag,"Received HTTP error after connecting to the server");
        Toast.makeText(mParentActivity,"Received HTTP error after connecting to the server .....",Toast.LENGTH_LONG).show();
        mProgDialog.dismiss();
        view.stopLoading();
        view.destroy();
        mParentActivity.finish();
    }
}
