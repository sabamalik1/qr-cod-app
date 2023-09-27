import React, { useState } from "react";
// import { Route } from "react-router-dom";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";

function AdminPrivateRoutes() {
  const location = useLocation();
  // const [pathRedirectTo, setPathRedirectTo] = useState("");
  // console.log("pathname:", location.pathname);
  const { userRole, isLoading } = useAuth();
  console.log("From AdminPrivateRoutes:", userRole);
  const loadingFallback = (
    <div className="h-screen w-screen flex justify-center items-center">
      <p>Hang Tight! We are getting something for you</p>
    </div>
  );

  if (userRole === "admin") {
    // console.log("pathname from isAdmin:", location.pathname);
    // console.log("pathRedirectTo from isAdmin:", pathRedirectTo);
    // if (pathRedirectTo === "/adminDashboard") {
    return (
      <>
        <h1>AdminPrivateRoutes</h1>
        <Outlet />
      </>
    );
    // }
  } else if (isLoading) {
    // console.log("pathname from isAdmin:", location.pathname);
    // console.log("pathRedirectTo from loading:", pathRedirectTo);
    // if (location.pathname !== pathRedirectTo)
      // setPathRedirectTo(location.pathname);
    return loadingFallback;
  } else {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {/* AdminPrivateRoutes isAuthorized ? (
      <Route {...rest} element={element} />
      ) : (
      <Navigate to="/login" replace />
      );
       <Route path='/AdminComponent/signUp' element={SignUP} /> */}
    </>
  );
}

export default AdminPrivateRoutes;
