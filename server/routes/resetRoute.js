import { Router } from "express";
import Employee from "../models/employee.js";
import Admin from "../models/admin.js";

const router = Router();

router.post("/employees", async (req, res) => {
  await Employee.deleteMany();
  res.status(204).end();
});

router.post("/admins", async (req, res) => {
  await Admin.deleteMany();
  res.status(204).end();
});

export default router;
