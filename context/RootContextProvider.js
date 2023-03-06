import { useState, createContext, useContext, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import firebaseConfig from "../firebaseConfig";

const RootContext = createContext();
const firebaseApp = initializeApp(firebaseConfig);

// Auth
const auth = getAuth(firebaseApp);

// Firestore
const db = getFirestore(firebaseApp);
const userColRef = collection(db, "users");

export default function RootContextProvider({ children }) {
  const [userCredentials, setUserCredentials] = useState({
    user: JSON.parse(localStorage.getItem("authUser")),
    loading: true,
  });

  useEffect(() => {
    console.log("useEffect root context");
    const listener = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        console.log("authUser present");
        localStorage.setItem("authUser", JSON.stringify(authUser));
        setUserCredentials({
          user: authUser,
          loading: false,
        });
      } else {
        // we don't have an authUser, therefore clear the localstorage
        localStorage.removeItem("authUser");
        setUserCredentials({
          user: null,
          loading: false,
        });
      }
    });

    return () => listener();
  }, []);
  // Event listener is catching logged in state automatically

  const value = { userCredentials, setUserCredentials, auth, db, userColRef };
  return <RootContext.Provider value={value}>{children}</RootContext.Provider>;
}

export const useRootContext = () => {
  return useContext(RootContext);
};
