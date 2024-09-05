import Employee from "../models/employee.js";

// Get all employees
const getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
};

// Get employee by ID
const getEmployeeById = async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) return res.status(404).json({ error: "Employee not found" });
  res.json(employee);
};

// Create a new employee
const createEmployee = async (req, res) => {
  const newEmployee = await Employee.create(req.body);
  res.status(201).json(newEmployee);
};

// Update an existing employee
const updateEmployee = async (req, res) => {
  const updatedEmployee = await Employee.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!updatedEmployee)
    return res.status(404).json({ error: "Employee not found" });
  res.json(updatedEmployee);
};

// Delete an employee
const deleteEmployee = async (req, res) => {
  const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
  if (!deletedEmployee)
    return res.status(404).json({ error: "Employee not found" });
  res.json({ message: "Employee deleted successfully" });
};

export default {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
