// const express = require('express');
import express from "express";
const router = express.Router();
// const employeesController = require("../../controllers/employeesController");
import EMPLOYEE from "../../controllers/employeesController.js";
import verifyRoles from "../../middleware/verifyRoles.js";
import ROLES_LIST from "../../config/roles_list.js";

router
  .route("/")
  .get(EMPLOYEE.getAllEmployees)
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    EMPLOYEE.createNewEmployee,
  )
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    EMPLOYEE.updateEmployee,
  )
  .delete(verifyRoles(ROLES_LIST.Admin), EMPLOYEE.deleteEmployee);

router.route("/:id").get(EMPLOYEE.getEmployee);

export default router;
