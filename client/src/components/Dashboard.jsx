import { useSelector } from "react-redux";
import EmployeeList from "./dashboard/EmployeeList";
import { initializeEmployees } from "../reducers/employeeReducer";
import { useDispatch } from "react-redux";
import { initializeAdmin, logoutAdmin } from "../reducers/adminReducer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import EmployeeDetails from "./dashboard/EmployeeDetails";
import EmployeeForm from "./dashboard/EmployeeForm";
import Confirmation from "./utils/Confirmation";
import { useRef } from "react";

const Dashboard = () => {
  const [employeeToShow, setEmployeeToShow] = useState(null);
  const [form, setForm] = useState({
    show: false,
    employee: null,
  });
  const confirmationRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const employees = useSelector((state) => state.employees);

  useEffect(() => {
    const initialize = async () => {
      try {
        if (!admin) {
          await dispatch(initializeAdmin());
        } else {
          await dispatch(initializeEmployees());
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate("/login");
        } else {
          if (error.message === "Unauthorized") {
            navigate("/login");
          }
        }
      }
    };

    initialize();
  }, [admin, navigate, dispatch]);

  if (!admin || !employees) {
    return null;
  }

  const handleLogout = async () => {
    const response = await confirmationRef.current.show(
      "Are you sure you want to logout?",
      "Logout"
    );
    if (!response) {
      return;
    }

    dispatch(logoutAdmin());
    navigate("/login");
  };

  return (
    <div className="p-8 max-w-[1080px] mx-auto">
      <nav>
        <h1 className="translate-y-1/2">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <p>
            Logged in as <strong>{admin}</strong>
          </p>
          <button className="danger-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      <EmployeeDetails
        employee={employeeToShow}
        setForm={setForm}
        setEmployeeToShow={setEmployeeToShow}
        confirmationRef={confirmationRef}
      />
      <EmployeeForm
        {...form}
        setForm={setForm}
        confirmationRef={confirmationRef}
      />
      <EmployeeList
        heading="All Employees"
        employees={employees}
        setEmployeeToShow={setEmployeeToShow}
      />
      <Confirmation ref={confirmationRef} />
    </div>
  );
};

export default Dashboard;
