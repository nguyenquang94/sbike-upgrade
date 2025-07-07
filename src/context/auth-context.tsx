import React, { FC } from "react";
import { login, setToken, logout } from "../shared-logic";
// import AsyncStorage from '@react-native-community/async-storage';
const AES = require("react-native-crypto-js").AES;
// @ts-ignore
import CryptoJS from "react-native-crypto-js";
import messaging from "@react-native-firebase/messaging";
import { User } from "../shared-logic";
import Storage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
type AuthType = {
  state: any;
  dispatch: any;
  signIn: (username: string, password: string) => void;
  signOut: () => void;
};

const AuthContext = React.createContext<AuthType>({
  state: null,
  dispatch: () => {},
  signIn: () => {},
  signOut: () => {},
});

type Props = {
  children: React.ReactNode;
};

const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userData: action.userData,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userData: action.userData,
            isLoading: false,
            isSubmitting: false,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            isLoading: false,
            userData: {},
            isSubmitting: false,
          };
        case "SUBMITTING":
          return {
            ...prevState,
            isSubmitting: true,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userData: {},
      isSubmitting: false,
    }
  );

  const handleLogin = async (username: string, password: string) => {
    const key = CryptoJS.enc.Utf8.parse("{60F9sG3*vpfCknu");
    const iv = CryptoJS.enc.Utf8.parse("0123456789123456");
    login({
      userName: username?.toLocaleLowerCase(),
      password: password ? AES.encrypt(password, key, { iv }).toString() : "",
    })
      .then((data: any) => data)
      .then(async (data) => {
        if (data?.errorCode) {
          dispatch({ type: "SIGN_OUT" });
          setTimeout(() => {
            Alert.alert(data.message);
          }, 1000);
        } else {
          // @ts-ignore
          let userData: User = data?.user || {};
          userData.userToken = data?.session;
          userData.originalPassword = password;
          // await saveUserData(JSON.stringify(userData));
          // Storage.setItem("userData", JSON.stringify(userData))
          //   .then(() => {
          //     setToken(userData?.userToken || "");
          //     dispatch({ type: "SIGN_IN", userData });
          //   })
          //   .catch(() => {
          //     dispatch({ type: "SIGN_OUT" });
          //     console.log("error");
          //   });
          try {
            await Storage.setItem("userData", JSON.stringify(userData));
            await Storage.setItem(
              "loginInfo",
              JSON.stringify({ username, password })
            );
            setToken(userData?.userToken || "");
            dispatch({ type: "SIGN_IN", userData });
          } catch (err) {
            console.error("Storage error:", err);
            dispatch({ type: "SIGN_OUT" });
          }
        }
      })
      .catch((error) => {
        dispatch({ type: "SIGN_OUT" });
        setTimeout(() => {
          Alert.alert(error.message);
        }, 100);
      });
  };

  const handleLogout = () => {
    logout("").then(async () => {
      try {
        await Storage.removeItem("userData");
        dispatch({ type: "SIGN_OUT" });
      } catch (error) {
        console.error("Failed to remove user data:", error);
      }
    });
    // messaging()
    //   .getToken()
    //   .then(async (token) => {
    //     logout(token).then(async () => {
    //       try {
    //         await Storage.removeItem('userData');
    //         dispatch({ type: 'SIGN_OUT' });
    //       } catch (error) {
    //         console.error('Failed to remove userData:', error);
    //       }
    //     });
    //   })
    //   .catch(() => {
    //     logout("").then( async() => {
    //       // Storage.removeItem('userData').then(() => {
    //       //   dispatch({type: 'SIGN_OUT'});
    //       // });
    //       try {
    //         await Storage.removeItem('userData');
    //         dispatch({ type: 'SIGN_OUT' });
    //       } catch (error) {
    //         console.error('Failed to remove user data:', error);
    //       }
    //     });
    //   });
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        signIn: (username, password) => handleLogin(username, password),
        signOut: () => handleLogout(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthState = () => React.useContext(AuthContext);

export { AuthProvider, useAuthState };
