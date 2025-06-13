import React, { useEffect } from "react";
import Config from 'react-native-config';
import {setupBusinessLayer} from './shared-logic';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';

import RootNavigator from './RootNavigator';
import {AuthProvider} from './context/auth-context';

// setupBusinessLayer(Config.API_URL);
export default function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  // useEffect(() => {
  //   // Assume a message-notification contains a "type" property in the data payload of the screen to open

  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     //on open
  //     console.log(remoteMessage);
  //   });

  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //         console.log(remoteMessage);
  //       }
  //     });
  // }, []);

  // useEffect(() => {
  //   // Khi user nhấn vào notification (app đang ở background)
  //   const unsubscribeOnOpened = messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log('App opened from background via notification:', remoteMessage);
  //     // TODO: điều hướng nếu cần
  //   });

  //   // Khi app khởi động từ trạng thái bị kill
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log('App launched from quit state via notification:', remoteMessage);
  //         // TODO: điều hướng nếu cần
  //       }
  //     });

  //   return () => {
  //     unsubscribeOnOpened();
  //   };
  // }, []);


  // useEffect(() => {
  //   // Khi app đang mở (foreground)
  //   const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
  //     console.log('Foreground notification:', remoteMessage);
  //     // TODO: Hiển thị custom local notification nếu cần
  //   });

  //   return unsubscribeOnMessage;
  // }, []);

  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
