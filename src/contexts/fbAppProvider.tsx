import { createContext } from "react";
import { initializeApp } from "firebase/app";
import { useRef } from "react";
import { FirebaseApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAFRuTARs24MbFS6Wh4YlLUfI-MBkMeXcU",
  authDomain: "blog-crm-3db84.firebaseapp.com",
  projectId: "blog-crm-3db84",
  storageBucket: "blog-crm-3db84.appspot.com",
  messagingSenderId: "545624651853",
  appId: "1:545624651853:web:0f294401f8ea897de74404",
  measurementId: "G-72JHXBMG6F",
};
const fbApp = initializeApp(firebaseConfig);

export const FirebaseAppContext = createContext<FirebaseApp>(fbApp);

const FirebaseAppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <FirebaseAppContext.Provider value={fbApp}>
      {children}
    </FirebaseAppContext.Provider>
  );
};

export default FirebaseAppProvider;
