import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";

function EmpPrivateRoutes() {
  const location = useLocation();
  const { userRole, isLoading } = useAuth();
  // as a splash screen show
  const loadingFallback = (
    <div className="h-screen w-screen flex justify-center items-center">
      <p>Hang Tight! We are getting something for you</p>
    </div>
  );
  if (userRole === "employee") {
    // console.log("User is an employee from private routes");
    return (
      <>
        {/* <h1>EmployeePrivateRoutes</h1> */}
        <Outlet />
      </>
    );
  } else if (isLoading) {
    // console.log("We are still checking the credntials");
    return loadingFallback;
  } else {
    // console.log("Nothing just going to login page");
    return <Navigate to="/login" replace />;
  }
  // if(userRole != "employee"){
  //   return <Navigate to={"/empSignUp"} replace />
  // }
  
}

export default EmpPrivateRoutes;
