import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import React, { useReducer, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import ConfirmDialog from "../ConfirmDialog";

const initialStates = {
  name: "",
  email: "",
  password: "",
  showPassword: false,
  // submitBtnDisable: "",
  errorMsg: "",
  salary: "",
  loading:false,
  jobType: "job type",
  //   isConfirmationOpen: false,
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
    case "SET_SALARY":
      return {
        ...state,
        salary: action.payload,
      };
    case "SET_JOB_TYPE":
      return {
        ...state,
        jobType: action.payload,
      };
      case "SET_LOADING":
        return {
          ...state,
          loading: action.payload,
        };
    // case "SET_IS_CONFIRMATION_OPEN":
    //   return {
    //     ...state,
    //     isConfirmationOpen: action.payload,
    //   };

    case "RESET_FORM":
      return {
        ...initialStates,
        // submitBtnDisable: false,
      };
    default:
      return state;
  }
};

export default function AddEmployee() {
  // const navigate = useNavigate()
  const [state, dispatch] = useReducer(reducer, initialStates);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const handleCancel = () => {
    if (state.name || state.email || state.password || state.salary) {
      // If any of the form fields are filled, open the confirmation dialog
      setIsConfirmationOpen(true);
    } else {
      // Otherwise, clear the form fields directly
      dispatch({ type: "RESET_FORM" });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Set loading to true when the form is submitted
    dispatch({ type: "SET_LOADING", payload: true });

    if (!state.email || !state.password || !state.name || !state.salary) {
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
      // Set loading back to false since the form submission failed
      dispatch({ type: "SET_LOADING", payload: false });
    } else if (state.password.length < 8) {
      toast.error("Password must be at least 8 characters", {
        toastId: "all_characters_filled",
      });
      // Set loading back to false since the form submission failed
      dispatch({ type: "SET_LOADING", payload: false });
    } else {
      try {
        // Create a new user account with Firebase
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          state.email,
          state.password
        );

        const user = userCredential.user;
        // dispatch({ type: "SET_LOADING", payload: false });
        // console.log("Loding in process")
        // Create an object with user data
        const userData = {
          uid: user.uid,
          name: state.name,
          email: state.email,
          salary:state.salary,
          jobType:state.jobType,
          // role: auth.currentUser.getIdTokenResult() ? "employee" : "admin",
        };
        console.log(userData);
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
        // Set loading back to false after successful authentication
        dispatch({ type: "SET_LOADING", payload: false });
        console.log("Loading completed");
        // navigate("/");

        toast.success("Registration successful", {
          toastId: "all_validation_passed",
        });
        dispatch({ type: "RESET_FORM", payload: "" });
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
        // Set loading back to false after handling errors
        dispatch({ type: "SET_LOADING", payload: false });
      }
    }
  };
    
  
  return (
    <form>
      <div className="flex items-center justify-center">
        <div className=" mt-10 w-[600px] h-[650px] background  px-8 py-4 border-2 border-inherit rounded-xl ">
          <div className="border-b border-gray-900/10 pb-12 w-[500px] h-[500px] mt-6  ">
            <h2 className="text-2xl font-semibold leading-7 text-gray-900  ">
              Add Employee Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) =>
                      dispatch({ type: "SET_NAME", payload: e.target.value })
                    }
                    value={state.name}
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full px-2 py-2 rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3 ">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) =>
                      dispatch({
                        type: "SET_PASSWORD",
                        payload: e.target.value,
                      })
                    }
                    value={state.password}
                    type={state.showPassword ? "text" : "password"} // Toggle between text and password type
                    // type="text"
                    name="password"
                    id="password"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                  />
                  <button
                    type="button"
                    className="top-[222px] left-[1000px] text-purple-500 absolute"
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
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) =>
                      dispatch({ type: "SET_EMAIL", payload: e.target.value })
                    }
                    value={state.email}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full px-2 py-2 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="job"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Job
                </label>
                <div className="mt-2">
                  <select
                    onChange={(e) =>
                      dispatch({
                        type: "SET_JOB_TYPE",
                        payload: e.target.value,
                      })
                    } // Dispatch the action to update jobType
                    value={state.jobType}
                    id="job"
                    name="job"
                    autoComplete="job-type"
                    className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>Job Type</option>
                    <option>Permanent</option>
                    <option>Contract</option>
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="salary"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Salary
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) =>
                      dispatch({ type: "SET_SALARY", payload: e.target.value })
                    }
                    value={state.salary}
                    type="number"
                    name="salary"
                    id="salary"
                    autoComplete="salary"
                    className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 flex items-center justify-end  gap-x-6 px-4 py-4 ">
              <button
                type="button"
                onClick={handleCancel}
                className="text-sm px-2 py-2 font-semibold leading-6 text-gray-900 hover:bg-slate-100 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                Cancel
              </button>
              {isConfirmationOpen && ( // Display the confirmation dialog if isConfirmationOpen is true
                <ConfirmDialog
                  message="Are you sure you want to discard all changes?"
                  onConfirm={() => {
                    // Clear the form fields here
                    dispatch({ type: "RESET_FORM" });
                    // Close the confirmation dialog
                    setIsConfirmationOpen(false);
                  }}
                  onCancel={() => {
                    // Close the confirmation dialog without clearing the form fields
                    setIsConfirmationOpen(false);
                  }}
                />
              )}
              <button
                type="submit"
                onClick={handleSubmit}
                className="rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
