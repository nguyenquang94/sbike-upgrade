import React, {useEffect, useState} from 'react';
import {Dimensions, SafeAreaView, Text, View} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Observer from '../components/Home/Observer';
import Devices from '../components/Home/Devices';
import Report from "../components/Home/Report";
import color from '../config/color';
import messaging from "@react-native-firebase/messaging";
import {registerTopic} from "../shared-logic/api/firebase";
import {useAuthState} from "../context/auth-context";


const Home: React.FC = () => {
  const [index, setIndex] = useState(0);
  const {state} = useAuthState();
  const userInfo = state?.userData;

  const [routes] = useState([
    {key: 'first', title: 'Giám sát'},
    {key: 'second', title: 'Thiết bị'},
    {key: 'third', title: 'Báo cáo'},
  ]);

  const renderScene = SceneMap({
    first: Observer,
    second: Devices,
    third: Report,
  });

  // useEffect(() => {
  //   let isMounted = true;

  //   async function requestAndRegisterToken() {
  //     try {
  //       const authStatus = await messaging().requestPermission();
  //       const enabled =
  //         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //       if (enabled && isMounted) {
  //         const token = await messaging().getToken();

  //         await registerTopic(userInfo?.companyID || '', token);
  //         console.log('FCM topic registered');
  //       }
  //     } catch (err) {
  //       console.log('FCM error:', err);
  //     }
  //   }

  //   requestAndRegisterToken();

  //   return () => {
  //     isMounted = false;
  //   };
  // },[userInfo?.companyID]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: color.blue}}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: Dimensions.get('window').width}}
        renderTabBar={props => (
          <TabBar {...props} indicatorStyle={{ backgroundColor: 'white' }} />
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
