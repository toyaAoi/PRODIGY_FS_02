import PropTypes from "prop-types";

const EmployeeList = ({ heading, employees, setEmployeeToShow }) => {
  return (
    <div className="border border-gray-400 rounded-lg">
      <h3 className="py-2 text-2xl text-center border-b border-gray-400">
        {heading}
      </h3>
      <div>
        <div className="employee-row text-xl font-semibold">
          <span>Department</span>
          <span>First Name</span>
          <span>Last Name</span>
          <span>Role</span>
        </div>
        <ul>
          {employees.map((employee) => (
            <li
              className="employee-row"
              key={employee.id}
              onClick={() => setEmployeeToShow(employee)}
            >
              <span>{employee.department}</span>
              <span>{employee.firstName}</span>
              <span>{employee.lastName}</span>
              <span>{employee.role}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

EmployeeList.propTypes = {
  heading: PropTypes.string.isRequired,
  employees: PropTypes.array.isRequired,
  setEmployeeToShow: PropTypes.func.isRequired,
};

export default EmployeeList;
