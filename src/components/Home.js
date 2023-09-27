import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useAuth } from "./AuthContext";
// import { onAuthStateChanged, getAuth } from "firebase/auth";

function Home(props) {
  const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(true)
  const handleSignout = useAuth()
  
  return (
    <>
      <div className="navbar text-primary-content bg-purple-800">
        <a href="/" className="btn btn-ghost normal-case text-xl">
          Home
        </a>

        <div className="flex flex-row gap-6 ml-24">
          <br />
          <h1>
            <Link to="/adminDashboard">AdminDashboard</Link>
          </h1>
          {/* <h1>
            <Link to="/empDashboard">empDashboard</Link>
          </h1> */}
          <h1>
            <Link to="/signup">Admin</Link>
          </h1>
          <h1>
            <Link to="/empSignUp">Employee</Link>
        </h1>

          {/* <h1>
            <Link to="/test" >Test</Link>
          </h1> */}
          <button onClick={handleSignout}>SignOut</button>
        </div>
      </div>
      {/* <div className="max-h-screen max-w-screen">
        <img src="./images/img4.jpg" alt="img" />
      </div> */}
      <div className="min-h-screen flex items-center justify-center">
        <img
          src="./images/img4.jpg"
          alt="Background"
          className="absolute object-cover w-full h-full"
        />
      </div>
    </>
  );
}

export default Home;


// const emails =["sabasaeed800@gmail.com", "haseeb@gmail.com"]
  // emails.forEach(async(email)=>{
  //   try{
  //     // 1) Get user by email
  //   const user = await getAuth().getUserByEmail(email);
  //   if (user.emailVerified) {
  //     // 3) Add custom claims for additional privileges.
  //     // This will be picked up by the user on token refresh or next sign-in on a new device.
  //     await getAuth().setCustomUserClaims(user.uid, {
  //       admin: true,
  //     });
  //     console.log(`Admin privileges granted for ${email}`);
  //   } else {
  //     console.log(`Email ${email} is not verified.`);

  //   }
  //   }catch(error){
  //     console.error(`Error processing ${email}: ${error}`);
  //   }
  // })



   // ya waala code optional ha jo main code ha observer wala wo run hona ha i check it for testing
  // Check user claims when component renders pahla home componenet render ho gha then claims k according dashboard pr move kr jaye gha
  // const checkUserClaims = async () => {
  //   try {
  //     const userData = auth.currentUser;
  //     if (userData) {
  //       const userClaims = await userData.getIdTokenResult();

  //       if (userClaims.claims?.admin) {
  //         console.log("User is an admin.");
  //         navigate("/adminDashboard");
  //       } else {
  //         console.log("User is not an admin.");
  //         navigate("/empDashboard");
  //       }
  //     } else {
  //       // User is signed out
  //       console.log("User is not logged in");
  //     }
  //   } catch (error) {
  //     console.error("Error getting user data:", error);
  //   }
  // };

  // // Call the function when the component renders
  // useEffect(() => {
  //   checkUserClaims();
  // }, []);

  //  if(isLoading){
  //   return <div>Loading...</div>; // Display loading indicator while checking auth state
  //  }