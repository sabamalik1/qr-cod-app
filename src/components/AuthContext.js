import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const initialStates = {
    name: "",
    email: "",
    password: "",
    showPassword: false,
    // submitBtnDisable: "",
    // errorMsg: "",
    loading: false,
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_NAME":
        return {
          ...state,
          name: action.payload,
        };
      case "SET_EMAIL":
        return {
          ...state,
          email: action.payload,
        };
      case "SET_PASSWORD":
        return {
          ...state,
          password: action.payload,
        };
      case "TOGGLE_PASSWORD_VISIBILITY":
        return {
          ...state,
          showPassword: !state.showPassword,
        };
      // case "SET_SUBMIT_BTN_DISABLE":
      //   return {
      //     ...state,
      //     submitBtnDisable: action.payload,
      //   };
      // case "SET_ERROR_MSG":
      //   return {
      //     ...state,
      //     errorMsg: action.payload,
      //   };
      case "RESET_FORM":
        return {
          initialStates,
          // submitBtnDisable: false,
        };
        case "SET_LOADING":
          return {
            ...state,
            loading: action.payload,
          };
      default:
        return state;
    }
  };

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
    initialStates,
    reducer,
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

            // Set loading to false when auth state is determined
            // setIsLoading(false);
            // // Check the user's role
            // if (userData.role === "admin") {
            //   console.log("User is an admin");
            //   // Redirect to admin dashboard or show admin-specific content
            //   // navigate("/adminDashboard");
            // } else if (userData.role === "employee") {
            //   console.log("User is an employee");
            //   // Redirect to employee dashboard or show employee-specific content
            //   // navigate("/employeeDashboard");
            // }
            // }
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
