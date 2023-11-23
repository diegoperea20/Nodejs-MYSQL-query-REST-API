import { Router } from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
  getEmployeesByName,
  getEmployeesBySalaryGreaterThan,
} from "../controllers/employees.controller.js";

const router = Router();

// GET all Employees
router.get("/employees", getEmployees);

// GET An Employee
router.get("/employees/:id", getEmployee);

// DELETE An Employee
router.delete("/employees/:id", deleteEmployee);

// INSERT An Employee
router.post("/employees", createEmployee);

router.patch("/employees/:id", updateEmployee);

router.get("/employees/search/:name", getEmployeesByName);

router.get("/employees/salaryGreaterThan/:salary", getEmployeesBySalaryGreaterThan);

export default router;
