import React, { useEffect } from "react";
import Config from 'react-native-config';
import {setupBusinessLayer} from './shared-logic';
import SplashScreen from 'react-native-splash-screen';
// import messaging from '@react-native-firebase/messaging';

import RootNavigator from './RootNavigator';
import {AuthProvider} from './context/auth-context';
import { Platform } from "react-native";


setupBusinessLayer(Platform.OS == 'ios' ? 'https://sbike-api.devbt.com/api' : 'http://sbike-api.devbt.com/api');
export default function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  // useEffect(() => {
  //   // 1. Khi app đang foreground
  //   const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
  //     console.log('🔔 Foreground notification:', remoteMessage);
  //     // TODO: Hiển thị local notification nếu cần
  //   });

  //   // 2. Khi app đang background và user nhấn vào notification
  //   const unsubscribeOnOpened = messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log('🚀 App opened from background via notification:', remoteMessage);
  //     // TODO: điều hướng nếu cần
  //   });

  //   // 3. Khi app được mở từ trạng thái bị kill do người dùng nhấn vào notification
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log('🔥 App launched from quit state via notification:', remoteMessage);
  //         // TODO: điều hướng nếu cần
  //       }
  //     });

  //   // Clear listener khi unmount
  //   return () => {
  //     unsubscribeOnMessage();
  //     unsubscribeOnOpened();
  //   };
  // }, []);

  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
