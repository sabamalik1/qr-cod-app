import React, { useReducer } from "react";
// import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link , useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useAuth } from "../AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";

const initialStates = {
  name: "",
  email: "",
  password: "",
  showPassword: false,
  loading: false,
};
const reducer = (state, action) => {
  switch (action.type) {
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
      case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
      case "RESET_FORM":
        return {
          initialStates,
        };

    default:
      return state;
  }
};

function EmpLogin() {
  const { setUserRole } = useAuth(); // Get setUserRole function from context
  const [state, dispatch] = useReducer(reducer, initialStates);
const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
dispatch({type:"SET_LOADING" })
    if (!state.email || !state.password) {
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
        const userCredential = await signInWithEmailAndPassword(
          auth,
          state.email,
          state.password
        );

        const user = userCredential.user;
        navigate("/")

        toast.success("Registration successful", {
          toastId: "all_validation_passed",
        });
        const userClaims = await auth.currentUser.getIdTokenResult();

        if (userClaims.claims?.admin) {
          console.log("User is an admin.");
          setUserRole("admin");
          navigate("/adminDashboard");
        } else {
          setUserRole("employee");
          console.log("User is not an admin.");
          navigate("/empDashboard");
        }
        
        dispatch({ type: "RESET_FORM", payload: "" });
        

      } catch (error) {
        if(error.code === "auth/wrong-password") {
          toast.error("Incorrect password. Please try again.", {
            toastId: "incorrect_password",
          });
        } else if (error.code === "auth/user-not-found") {
          toast.error("Incorrect password and user not found.", {
            toastId: "incorrect_password",
          });
        } else {
          if (error.code === "auth/email-already-in-use") {
            toast.error("Email is already in use.", {
              toastId: "Email_already_exist",
            });
          }
        }
        
      }
    }
  };
  return (
    <>
      <div className="w-screen h-screen bg-purple-400 absolute">
        <div className="w-[900px] h-[500px] background bg-slate-50 absolute left-[270px] top-24 justify-center rounded-2xl px-2 py-2">
          <div>
            <h1 className="text-3xl absolute left-[200px] top-[45px] text-purple-800 font-bold">
              Login
            </h1>
            <h1 className="text-2xl font-bold ml-44 top-[95px] text-purple-800 absolute">
              Hello Friends!
            </h1>
            <h3 className="text-2sm font-sm ml-40 top-[135px] text-purple-800 absolute">
              SignIn to your account
            </h3>
            <form>
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
                // disabled={true}
                className="top-[340px] bg-purple-500 text-white px-4 py-2 w-[280px] h-[40px] absolute left-[120px] rounded-md hover:bg-purple-400"
              >
                Submit
              </button>
              <h4 className="top-[400px] absolute ml-28 text-purple-800">
                Don't have an account?
                <Link
                  className="text-xl font-semibold hover:bg-purple-500"
                  to="/signUp"
                >SignUp</Link>
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
              Welcome Back!
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmpLogin;
