import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteEmployee } from "../../reducers/employeeReducer";

const EmployeeDetails = ({
  employee,
  setForm,
  setEmployeeToShow,
  confirmationRef,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!employee) {
    return null;
  }

  const handleEdit = () => {
    setEmployeeToShow(null);
    setForm({ show: true, employee });
  };

  const handleDelete = async () => {
    try {
      const response = await confirmationRef.current.show(
        `Are you sure you want to remove ${employee.firstName} ${employee.lastName}?`,
        "Delete"
      );
      if (!response) {
        return;
      }
      await dispatch(deleteEmployee(employee.id));
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        navigate("/login");
      }
    }
  };

  return (
    <div className="fade-in-container">
      <div className="popup-container employee-details relative">
        <h2 className="text-3xl font-semibold text-sky-400 mb-8">
          {employee.firstName} {employee.lastName}
        </h2>

        <p>
          <span>
            <strong>Email:</strong>
          </span>
          <span>{employee.email}</span>
        </p>

        <p>
          <span>
            <strong>Phone:</strong>
          </span>
          <span>{employee.phone}</span>
        </p>

        <p>
          <span>
            <strong>Date Hired:</strong>
          </span>
          <span>{new Date(employee.dateHired).toLocaleDateString()}</span>
        </p>

        <p>
          <span>
            <strong>Role:</strong>
          </span>
          <span>{employee.role}</span>
        </p>

        <p>
          <span>
            <strong>Department:</strong>
          </span>
          <span>{employee.department}</span>
        </p>

        <p>
          <span>
            <strong>Salary:</strong>
          </span>
          <span>₹ {employee.salary.toLocaleString()}</span>
        </p>

        <p>
          <span>
            <strong>Address:</strong>
          </span>
          <span>{employee.address}</span>
        </p>

        <div className="buttons-container absolute bottom-8 right-8">
          <button onClick={handleEdit} className="submit-button">
            Edit
          </button>
          <button onClick={handleDelete} className="danger-button">
            Delete
          </button>
          <button onClick={() => setEmployeeToShow(null)}>Close</button>
        </div>
      </div>
    </div>
  );
};

// Prop types for validation
EmployeeDetails.propTypes = {
  employee: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    dateHired: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    salary: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
  }),
  setForm: PropTypes.func.isRequired,
  setEmployeeToShow: PropTypes.func.isRequired,
  confirmationRef: PropTypes.object,
};

export default EmployeeDetails;
