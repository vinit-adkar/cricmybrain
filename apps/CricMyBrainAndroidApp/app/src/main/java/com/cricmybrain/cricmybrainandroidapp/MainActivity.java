package com.cricmybrain.cricmybrainandroidapp;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.about_cmb,menu);
        return super.onCreateOptionsMenu(menu);
    }

    public void onClickRemoteServer(View view){
        startActivity(new Intent("com.cricmybrain.cricmybrainandroidapp.RemoteServerActivity"));
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.about_cmb:
                // About CricMyBrain was selected
                startActivity(new Intent("com.cricmybrain.cricmybrainandroidapp.AboutCmbActivity"));
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }

}
