import { describe, it, afterEach } from "node:test";
import * as chai from "chai";
import sinon from "sinon";
import Employee from "../models/employee.js";
import employeeController from "../controllers/employeeController.js";

const expect = chai.expect;

describe("EmployeeController", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should get all employees", async () => {
    const req = {};
    const res = {
      json: sinon.spy(),
    };

    const mockEmployees = [
      { name: "John Doe", department: "IT", role: "Manager" },
    ];
    sinon.stub(Employee, "find").resolves(mockEmployees);

    await employeeController.getAllEmployees(req, res);

    expect(Employee.find).to.have.been.calledOnce;
    expect(res.json).to.have.been.calledWith(mockEmployees);
  });
});
