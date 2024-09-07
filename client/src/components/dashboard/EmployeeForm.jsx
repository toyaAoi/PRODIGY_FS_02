import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  addNewEmployee,
  editEmployeeDetails,
} from "../../reducers/employeeReducer";

const EmployeeForm = ({ show, employee, setForm, confirmationRef }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateHired: "",
    role: "",
    department: "",
    salary: "",
    address: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.firstName || "",
        lastName: employee.lastName || "",
        email: employee.email || "",
        phone: employee.phone || "",
        dateHired: employee.dateHired.split("T")[0] || "",
        role: employee.role || "",
        department: employee.department || "",
        salary: employee.salary || "",
        address: employee.address || "",
      });
    }
  }, [employee]);

  if (!show) {
    return (
      <div className="flex justify-end -mt-4 mb-6">
        <button
          className="submit-button"
          onClick={() => setForm({ show: true })}
        >
          Add Employee
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateHired: "",
      role: "",
      department: "",
      salary: "",
      address: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (employee) {
        const response = await confirmationRef.current.show(
          `Update data for ${employee.firstName} ${employee.lastName}?`,
          "Update"
        );
        if (!response) {
          return;
        }
        await dispatch(editEmployeeDetails(employee.id, formData));
      } else {
        await dispatch(addNewEmployee(formData));
      }
    } catch (error) {
      console.error(error);
    }

    resetForm();
    setForm({ show: false });
  };

  const handleCancel = () => {
    setForm({ show: false });
    resetForm();
  };

  return (
    <div className="fade-in-container">
      <div className="popup-container">
        <form onSubmit={handleSubmit} className="">
          <h2>{employee ? "Edit Employee" : "Add Employee"}</h2>

          <label htmlFor="firstName">First Name:</label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <label>Last Name:</label>
          <input
            id="lastname"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="phone">Phone:</label>
          <input
            id="phone"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <label htmlFor="dateHired">Date Hired:</label>
          <input
            id="dateHired"
            type="date"
            name="dateHired"
            value={formData.dateHired}
            onChange={handleChange}
            required
          />

          <label htmlFor="role">Role:</label>
          <input
            id="role"
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          />

          <label htmlFor="department">Department:</label>
          <input
            id="department"
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />

          <label htmlFor="salary">Salary:</label>
          <input
            id="salary"
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />

          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <div className="mt-4 flex justify-end gap-4">
            <button type="submit">{employee ? "Update" : "Submit"}</button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EmployeeForm.propTypes = {
  show: PropTypes.bool.isRequired,
  employee: PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    dateHired: PropTypes.string,
    role: PropTypes.string,
    department: PropTypes.string,
    salary: PropTypes.number,
    address: PropTypes.string,
  }),
  setForm: PropTypes.func.isRequired,
  confirmationRef: PropTypes.object,
};

export default EmployeeForm;
