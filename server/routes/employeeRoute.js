import { Router } from "express";
import employeeController from "../controllers/employeeController.js";
import employeeInputValidation from "../middlewares/employeeInputValidation.js";

const router = Router();

// Get all employees
router.get("/", employeeController.getAllEmployees);

// Get a single employee by ID
router.get("/:id", employeeController.getEmployeeById);

// Add a new employee
router.post("/", employeeInputValidation, employeeController.createEmployee);

// Update an employee details
router.put("/:id", employeeInputValidation, employeeController.updateEmployee);

// Remove an employee
router.delete("/:id", employeeController.deleteEmployee);

export default router;
