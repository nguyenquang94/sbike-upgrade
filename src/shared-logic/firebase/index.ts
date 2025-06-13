// import firebase from 'firebase/app';
import 'firebase/messaging';
import { initializeApp } from 'firebase/app';
import { getMessaging, isSupported } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyCCpjv71kBl6noJavE593UrQ2TBuPOX4SU',
  authDomain: 'sbike-6fc97.firebaseapp.com',
  databaseURL: 'https://sbike-6fc97.firebaseio.com',
  projectId: 'sbike-6fc97',
  storageBucket: 'sbike-6fc97.appspot.com',
  messagingSenderId: '787092921860',
  appId: '1:787092921860:web:d91ac25f3cbce5828b5f51',
  measurementId: 'G-G8ENTK9JX7',
};

initializeApp(firebaseConfig);
let messaging: any = null;

// if (firebase.messaging.isSupported()) {
//   messaging = firebase.messaging();
// }
isSupported().then((supported) => {
  if (supported) {
    messaging = getMessaging();
    // bạn có thể tiếp tục sử dụng messaging ở đây
  }
});

export {messaging};
