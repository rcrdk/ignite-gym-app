# 🏋🏼‍♂️ React Native Ignite Gym Tracker App
This app was created to help users track their gym exercises. This project was developed as part of my lessons at [Rocketseat](https://rocketseat.com.br).

---

<p align="center">
  <img alt="React Native Ignite Gym Tracker App Preview" src="https://github.com/rcrdk/ignite-gym-app/blob/main/public/app.jpg?raw=true" width="100%" />
</p>

## 📱 Features
**User Authentication:**
   - Sign Up: Create a new account.
   - Sign In: Log in to an existing account.
  
**Exercise Management:**
  - Exercise Categories: Browse exercises grouped by categories.
  - Detailed Instructions: View step-by-step instructions for each exercise.
  - Mark as Done: Track completed exercises.

**Progress Tracking:**
  - Exercise History: Access a detailed history of all completed exercises grouped by day.

**Profile Management:**
  - Update Profile: Edit personal information and account credentials.

**Notifications:**
  - This app has an integration with OneSignal Push Notifications with Firebase Cloud Messaging (Android) and Apple Push Notification Service.
  - It was created 4 segments:
    1. Authenticated users: to send notifications about new exercises available.
    2. Unuthenticated users: to send notification to enter with an account or register with a new one.
    3. Last exercise: to send a notification if the last exercise was done after a given time and motivate the user to keep training.
    4. Weekly report: to send the average count of exercises done during the week.
  - Checkout [detailed informations](https://github.com/rcrdk/ignite-gym-app/blob/main/ONESIGNAL.md) about tags, segments and notifications of this app. 

## ⚙️ Tech Stack
- [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/)
- [AsyncStorage](https://docs.expo.dev/versions/latest/sdk/async-storage/) + [FileSystem](https://docs.expo.dev/versions/latest/sdk/filesystem/) + [ImagePicker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
- [React Navigation](https://reactnavigation.org/docs/getting-started/): Stack and Bottom Tabs
- [Gluestack UI V1](https://v1.gluestack.io/)
- [React Hook Form](https://www.react-hook-form.com/) + [Zod](https://zod.dev/)
- [Axios](https://axios-http.com/)
- [OneSignal Push Notifications](https://onesignal.com/) + [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging)
 
## 💻 Usage

1️⃣ **Setup API:** ([available here](https://github.com/orodrigogo/ignitegym-api))
```shell
npm i
npm run migrations
npm run seed
npm run dev
```

2️⃣ **Setup environment variables:**
```shell
EXPO_PUBLIC_API_URL="" ## http://<IP_ADDRESS>:<PORT>
EXPO_PUBLIC_ONESIGNAL_APP_ID_ANDROID=""
EXPO_PUBLIC_ONESIGNAL_APP_ID_IOS=""
```

3️⃣ **Setup app:**
```shell
npm i
npm run ## android or ios
```

## 🚚 API
It was used an already existent API to develped this app, check it out [here](https://github.com/orodrigogo/ignitegym-api).
