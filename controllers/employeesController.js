// import employees from "../model/employees.json" assert { type: "json" };
import Employee from "../model/Employees.js";

const EMPLOYEE = {
  async getAllEmployees(req, res) {
    const employees = await Employee.find();
    if (!employees) {
      return res.status(204).send({ message: "Don't have any employees" });
    }
    res.json(employees);
  },

  async createNewEmployee(req, res) {
    if (!req?.body?.firstname || !req?.body?.lastname) {
      return res
        .status(400)
        .json({ message: "firstname and lastname are required" });
    }
    try {
      const result = await Employee.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
      });
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
    }
  },

  async updateEmployee(req, res) {
    if (!req?.body?.id) {
      return res.status(400).json({ message: "ID parameter is required." });
    }

    const employee = await Employee.findOne({ _id: req.body.id }).exec();
    if (!employee) {
      return res
        .status(204)
        .json({ message: `No employee matches ID ${req.body.id}.` });
    }
    if (req.body?.firstname) employee.firstname = req.body.firstname;
    if (req.body?.lastname) employee.lastname = req.body.lastname;
    const result = await employee.save();
    res.json(result);
  },

  async deleteEmployee(req, res) {
    console.log("delete called");
    if (!req?.body?.id)
      return res.status(400).json({ message: "Employee ID required." });

    console.log(req.body);
    console.log(req.body.id);

    const employee = await Employee.findOne({ _id: req.body.id }).exec();
    if (!employee) {
      return res
        .status(204)
        .json({ message: `No employee matches ID ${req.body.id}.` });
    }
    const result = await employee.deleteOne(); //{ _id: req.body.id }
    res.json(result);
  },

  async getEmployee(req, res) {
    if (!req?.params?.id)
      return res.status(400).json({ message: "Employee ID required." });
    console.log(req.params);
    console.log(req.params.id);

    const employee = await Employee.findOne({ _id: req.params.id }).exec();
    if (!employee) {
      return res
        .status(204)
        .json({ message: `No employee matches ID ${req.params.id}.` });
    }
    res.json(employee);
  },
};

export default EMPLOYEE;
