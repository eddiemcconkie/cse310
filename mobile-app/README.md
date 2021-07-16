# CSE 310 - Team Project (Mobile App in Kotlin)
The Mobile App has been created for students to have the ability to interact with their teacher during class. It works directly with the desktop app controlled by the teacher.

# Description:
This mobile app was created using Android Studio and Kotlin. A codescanner Library was used to implement a qr code for students to add a class to their phone.

# How it works:
Once installed the student will see an empty screen with a button to add/join a new class on their phone. Once clicked the code scanner view will pop up and students can scan a generated QR code from the teacher desktop app. Once scanned the app will return to the homepage view with the new class displayed. To view how this work please watch the
[Tutorial Video](../README.md).

## Mobile App Viewing
If you would like to interact with the mobile app you can do the following:
 - Clone the repository using your terminal, VSCode, etc.
 - Download [Android Studio](https://developer.android.com/studio/) (with the emulator) if you don't already have it.
 - Open Android Studio (if it is your first time, you may have to do some setup)
 - Go to `File > Open`
 - Navigate to the cloned repository and open the `mobile-app` folder
 - Android studio should then run though some setup and a gradle sync
 - Once Android Studio finishes setting it up, you should be able to press the green play button on the top bar (alternatively, you can go to `Run > Run 'app'`)
    - If you don't have an emulator, you'll need to set that up ([Set up Android Studio emulator](https://developer.android.com/studio/run/managing-avds#createavd))
    - If you would like, you can also use an Android phone:
        - Just turn on [Developer Options](https://www.howtogeek.com/129728/how-to-access-the-developer-options-menu-and-enable-usb-debugging-on-android-4.2/) and enable USB debugging, Android Studio should automatically find it.
        - If not, select the dropdown next to the green play button, and choose `Troubleshoot Device Connections` and follow the steps
