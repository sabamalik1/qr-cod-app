import "./App.css";
import QRCodeGenerate from "./components/AdminComponent/QRCodeGenerate";
import QRCodeScanner from "./components/EmployeeComponet/QRCodeScanner";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/AdminComponent/Login";
import { ToastContainer } from "react-toastify";
import AdminDashboard from "./components/AdminComponent/AdminDashboard";
import EmployeeDsahboard from "./components/EmployeeComponet/EmployeeDsahboard";
import EmpSignUP from "./components/EmployeeComponet/EmpSignUp";
import EmpLogin from "./components/EmployeeComponet/EmpLogin";
import AdminPrivateRoutes from "./components/AdminComponent/AdminPrivateRoutes";
import EmpPrivateRoutes from "./components/EmployeeComponet/EmpPrivateRoutes";
import Page404 from "./components/Page404";
import Employees from "./components/AdminComponent/Employees";
import AddEmployee from "./components/AdminComponent/AddEmployee";
import EmpAttendance from "./components/EmployeeComponet/EmpAttendance";
import TotalEmployees from "./components/AdminComponent/TotalEmployees";
import TotalEmployeesStats from "./components/AdminComponent/TotalEmployeesStats";

function App() {
 
  return (
    <>
      <ToastContainer limit={3} position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Page404 />} />
        <Route path="/login" element={<Login />} />
        <Route element={<AdminPrivateRoutes />}>
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/qrCode" element={<QRCodeGenerate />} />
          {/* <Route path="/employees" element={<Employees />} /> */}
          <Route path="/empsignUp" element={<EmpSignUP />} />
          <Route path="/addEmployee" element={<AddEmployee />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/totaluser" element={<TotalEmployees />} />
          {/* <Route path="/stats" element={<TotalEmployeesStats />} /> */}
        </Route>

        <Route element={<EmpPrivateRoutes />}>
          <Route path="/empDashboard" element={<EmployeeDsahboard />} />
          <Route path="/scanner" element={<QRCodeScanner />} />
          <Route path="/attendance" element={<EmpAttendance />} />
          {/* <Route path="/attendance" element={<FetchEmpData />} /> */}
        </Route>

      </Routes>
    </>
  );
}

export default App;

