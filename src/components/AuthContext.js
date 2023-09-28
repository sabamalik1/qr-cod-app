import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
 


  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(""); // Initialize userRole with the user's role
  const navigate = useNavigate();
  const handleSignout = async () => {
    try {
      await auth.signOut();
      navigate("/login")
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  const value = {
    userRole,
    setUserRole,
    isLoading,
    handleSignout,
  };

  // observer jo pori app ma 1 hi dfa lgna ha
  useEffect(() => {
    setIsLoading(true);
    // console.log("I am in useEffect before observer", isLoading);
    const unSubscribeAuthObserver = onAuthStateChanged(
      auth,
      async (userData) => {
        if (userData) {
          // console.log(userData);
          try {
            // if (userData) {
            const userClaims = await auth.currentUser.getIdTokenResult();

            if (userClaims.claims?.admin) {
              console.log("User is an admin.");
              setUserRole("admin");
              setIsLoading(false);
              // navigate("/adminDashboard");
            } else {
              setUserRole("employee");
              setIsLoading(false);
              console.log("User is not an admin.");
              // navigate("/empDashboard");
            }
          } catch (error) {
            setIsLoading(false);
            console.error("Error getting user data:", error);
          }
        } else {
          setIsLoading(false);
          // User is signed out
          // navigate("/empLogin");
          console.log("User is not logged in");
        }
      }
    );

    // console.log("I am in useEffect after observer", isLoading);
    return () => {
      unSubscribeAuthObserver();
    };
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
