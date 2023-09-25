import React, { useReducer } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

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

function EmpSignUP() {
  const [state, dispatch] = useReducer(reducer, initialStates);
  // const navigate = useNavigate();

  // const user = firebase.auth().currentUser;

  // if (user) {
  //   // Check the user's custom claims to determine their role
  //   const idTokenResult = await user.getIdTokenResult();
  //   const userRole = idTokenResult.claims.role;

  //   if (userRole === 'admin') {
  //     // Grant admin privileges
  //   } else if (userRole === 'employee') {
  //     // Grant employee privileges
  //   } else {
  //     // Handle unknown role or unauthorized access
  //   }
  // }

  // const unsubscribeOnAuthStateChanged = auth.onAuthStateChanged(
  //   async (user) => {
  //     if (user) {
  //       // User is authenticated
  //       try {
  //         const idTokenResult = await user.getIdTokenResult();
  //         const customClaims = idTokenResult.claims;

  //         // Check the user's role
  //         if (customClaims.role === "admin") {
  //           console.log("User is an admin");
  //           // User is an admin
  //           // Redirect to admin dashboard or show admin-specific content
  //         } else {
  //           console.log("User is an employee");
  //           // User is an employee
  //           // Redirect to employee dashboard or show employee-specific content
  //         }
  //       } catch (error) {
  //         console.error("Error getting custom claims:", error);
  //       }
  //     } else {
  //       // User is not authenticated
  //     }
  //   }
  // );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (state.submitBtnDisable) {
    //   return;
    // }
    // dispatch({ type: "SET_SUBMIT_BTN_DISABLE", payload: true });
    // dispatch({type:"SET_SUBMIT_BTN_DISABLE", payload:true})
    dispatch({ type: "SET_LOADING", payload: true });
    if (!state.email || !state.password || !state.name) {
      // Display a toast message if any field is empty
      toast.error(
        "Please fill in all fields",
        {
          toastId: "all-validation-failed",
        },
        {
          enter: "animate__animated animate__bounceIn",
          exit: "animate__animated animate__bounceOut",
        }
      );
    } else if (state.password.length < 8) {
      toast.error("Password must be at least 8 characters", {
        toastId: "all_characters_filled",
      });
    } else {
      try {
        // Create a new user account with Firebase
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          state.email,
          state.password
        );

        const user = userCredential.user;
        dispatch({ type: "SET_LOADING", payload: false });
        console.log("Loding in process")
        // Create an object with user data
        const userData = {
          uid: user.uid,
          name: state.name,
          email: state.email,
          role: auth.currentUser.getIdTokenResult() ? "employee" : "admin",
        };
        // // Store user data in cloud forestore under their UID
        try {
          // Add a new document with a generated id.
          const docRef = await addDoc(collection(db, "users"), userData);
          console.log("Document written with ID: ", docRef.id);

          console.log("User data has been stored in the database");
        } catch (error) {
          console.error("Error storing user data:", error);
        }

        // Update the user's display name
        await updateProfile(user, {
          displayName: state.name,
        });
        // dispatch({ type: "SET_LOADING", payload: false });
        console.log("LOading completed")
        // navigate("/");

        toast.success("Registration successful", {
          toastId: "all_validation_passed",
        });
        dispatch({ type: "RESET_FORM", payload: "" });
        // dispatch({ type: "SET_EMAIL", payload: "" });
        // dispatch({ type: "SET_PASSWORD", payload: "" });
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          // To-Do - emit toast for email already exist and use toastId for it
          toast.error("Email is already in use.", {
            toastId: "Email_already_exist",
          });

          // Set the error message state when email is already in use
          // dispatch({
          //   type: "SET_ERROR_MSG",
          //   payload: "Email is already in use.",
          // });
        }
      }
    }
    dispatch({ type: "SET_LOADING", payload: false });
    // dispatch({ type: "SET_SUBMIT_BTN_DISABLE", payload: false });
    // dispatch({type:"RESET_FORM"})
  };
  return (
    <>
      <div className="w-screen h-screen bg-purple-400 absolute">
        <div className="w-[900px] h-[500px] background bg-slate-50 absolute left-[270px] top-24 justify-center rounded-2xl px-2 py-2">
          <div>
            <h1 className="text-3xl absolute left-[200px] top-[18px] text-purple-800 font-bold">
              SignUp
            </h1>
            <h1 className="text-2xl font-bold ml-44 top-[70px] text-purple-800 absolute">
              Hello, friends!
            </h1>
            <form>
              <input
                placeholder="Enter Name"
                className=" top-[130px] w-[280px] h-[40px] absolute rounded-md border p-2 left-[120px] focus:outline-none focus:border-purple-500  "
                onChange={(e) =>
                  dispatch({ type: "SET_NAME", payload: e.target.value })
                }
                type="text"
                name="name"
                value={state.name}
              />
              <br />
              <input
                placeholder="Enter E-mail"
                className=" top-[200px] w-[280px] h-[40px] absolute rounded-md border p-2 left-[120px] focus:outline-none focus:border-purple-500  "
                onChange={(e) =>
                  dispatch({ type: "SET_EMAIL", payload: e.target.value })
                }
                type="email"
                name="email"
                value={state.email}
              />
              <br />
              <input
                placeholder="Enter Password"
                className="border p-2 rounded-md left-[120px] top-[270px] w-[280px] h-[40px] focus:outline-none focus:border-purple-500 absolute"
                onChange={(e) =>
                  dispatch({ type: "SET_PASSWORD", payload: e.target.value })
                }
                type={state.showPassword ? "text" : "password"} // Toggle between text and password type
                name="password"
                value={state.password}
              />
              <button
                type="button"
                className="top-[280px] left-[370px] text-purple-500 absolute"
                onClick={() =>
                  dispatch({
                    type: "TOGGLE_PASSWORD_VISIBILITY",
                    payload: false,
                  })
                }
              >
                {state.showPassword ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </button>
              <br />

              <button
                onClick={handleSubmit}
                type="button"
                disabled={state.loading? true : false}
                className="top-[340px] bg-purple-500 text-white px-4 py-2 w-[280px] h-[40px] absolute left-[120px] rounded-md hover:bg-purple-400"
              >
                {state.loading ? "Loading..." : "Submit"}
              </button>
              <h4 className="top-[420px] absolute ml-28 text-purple-800">
                Already have an account?{" "}
                <Link
                  className="text-xl font-semibold hover:bg-purple-500"
                  to="/login"
                >
                  Login
                </Link>
              </h4>
              {/* {state.errorMsg && (
                <div className="text-red-500 text-center top-[390px] absolute ml-28">
                  {state.errorMsg}
                </div>
              )} */}
            </form>
          </div>
          <div className="w-[400px] h-[500px] text-white top-0 right-0 absolute background  bg-purple-800 rounded-tl-none rounded-tr-2xl rounded-bl-none rounded-br-2xl">
            <h1 className="flex justify-center items-center text-3xl font-semibold top-[200px] relative">
              Glad to see you!
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmpSignUP;
