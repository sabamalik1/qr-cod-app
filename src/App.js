import "./App.css";
// import CreateNote from "./CreateNote";
import QRCodeGenerate from "./components/AdminComponent/QRCodeGenerate";
import QRCodeScanner from "./components/EmployeeComponet/QRCodeScanner";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/AdminComponent/SignUP";
import Login from "./components/AdminComponent/Login";
import { ToastContainer } from "react-toastify";
import AdminDashboard from "./components/AdminComponent/AdminDashboard";
import EmployeeDsahboard from "./components/EmployeeComponet/EmployeeDsahboard";
// import { useAuth } from "./components/AdminComponent/AuthContext";
import EmpSignUP from "./components/EmployeeComponet/EmpSignUp";
import EmpLogin from "./components/EmployeeComponet/EmpLogin";
import Test from "./components/EmployeeComponet/Test";
// import Practice from "./components/AdminComponent/Practice";
import Practice from "./components/AdminComponent/Practice";
import AdminPrivateRoutes from "./components/AdminComponent/AdminPrivateRoutes";
import EmpPrivateRoutes from "./components/EmployeeComponet/EmpPrivateRoutes";
import Page404 from "./components/Page404";
import { useAuth } from "./components/AuthContext";
import Employees from "./components/AdminComponent/Employees";
import AddEmployee from "./components/AdminComponent/AddEmployee";
import EmpProfile from "./components/EmployeeComponet/EmpProfile";
import EmpAttendance from "./components/EmployeeComponet/EmpAttendance";

function App() {
  // const { userRole } = useAuth(); // Get the user's role from
  // const USER_ROLES = {
  //   ADMIN_USER: "admin user",
  //   EMPLOYEE_USER: "employee user",
  // };
  // const CURRENT_USER_ROLE = USER_ROLES.EMPLOYEE_USER
  return (
    <>
      <ToastContainer limit={3} position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Page404 />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/signUp" element={<SignUp />} /> */}
        <Route element={<AdminPrivateRoutes />}>
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/qrCode" element={<QRCodeGenerate />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/empsignUp" element={<EmpSignUP />} />
          <Route path="/addEmployee" element={<AddEmployee />} />
        </Route>

        {/* <Route path="/empLogin" element={<EmpLogin />} /> */}

        <Route element={<EmpPrivateRoutes />}>
          <Route path="/empDashboard" element={<EmployeeDsahboard />} />
          <Route path="/scanner" element={<QRCodeScanner />} />
          <Route path="/attendance" element={<EmpAttendance />} />
        </Route>

        {/* <Route path="/qrCodegen" element={<QRCodeGenerate />} />
        <Route path="/scan" element={<QRCodeScanner/>} />  
        <Route path="/test" element={<Test />} />    
        <Route path="/test1" element={<AdminDashboard />} />
        */}
      </Routes>
    </>
  );
}

export default App;

{
  /* <Route path="/" element={<Home />} />
        {USER_ROLES === "ADMIN_USER" ? (
          <Route
          path="/AdminComponent/*" // Nested routes for admin
          element={<AdminPrivateRoutes />}
        />
        ) : (
          <Route
          path="/EmployeeComponent/*" // Nested routes for employee
          element={<EmpPrivateRoutes />}
        />
        )} */
}

{
  /* <Route path="/dashboard" element={<SidebarLinkGroup /> } /> */
}

{
  /* Use Route components for admin and employee routes */
}
{
  /* <Route
          path="/AdminComponent/*" // Nested routes for admin
          element={<AdminPrivateRoutes />}
        />
        <Route
          path="/EmployeeComponent/*" // Nested routes for employee
          element={<EmpPrivateRoutes />}
        /> */
}
