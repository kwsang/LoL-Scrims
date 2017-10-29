package controllers;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.database.*;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

public class DatabaseServices {
    public static FirebaseOptions options;
    public static boolean firebaseLoaded = initFirebase();
    public final static FirebaseDatabase database = FirebaseDatabase.getInstance();

    final static String firebaseURL = "https://lol-scrims.firebaseio.com";
    final static FileInputStream serviceAccount = new FileInputStream(
            "conf/lol-scrims-firebase-adminsdk-d0iv2-deb48826f7.json");

    public DatabaseServices() {
    }

    public static boolean initFirebase() {
        // check if firebase has already been initialized
        if (FirebaseApp.getApps().isEmpty()) {
            try {
                options = new FirebaseOptions.Builder()
                        .setCredential(FirebaseCredentials.fromCertificate(serviceAccount))
                        .setDatabaseUrl("https://lol-scrims.firebaseio.com").build();
            } catch (IOException e) {
                e.printStackTrace();
            }
            FirebaseApp.initialize(options);
            return true;
        }
        System.out.println("Firebase app already initialized.");
        return true;
    }
}