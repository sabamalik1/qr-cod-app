import React from "react";
// import { Route } from "react-router-dom";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function AdminPrivateRoutes() {
  const { userRole, isLoading } = useAuth();
  console.log("From AdminPrivateRoutes:", userRole);
  const loadingFallback = (
    <div className="h-screen w-screen flex justify-center items-center">
      <p>Hang Tight! We are getting something for you</p>
    </div>
  );

  if (userRole === "admin") {
    return (
      <>
        <h1>AdminPrivateRoutes</h1>
        <Outlet />
      </>
    );
  } else if (isLoading) {
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
