import express from "express";
import USERS from "../controllers/usersController.js";
import ROLES_LIST from "../config/roles_list.js";
import verifyRoles from "../middleware/verifyRoles.js";

const router = express.Router();

router
  .route("/")
  .get(verifyRoles(ROLES_LIST.Admin), USERS.getAllUsers)
  .delete(verifyRoles(ROLES_LIST.Admin), USERS.deleteUser);

export default router;
