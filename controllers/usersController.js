import User from "../model/User.js";
import bcrypt from "bcrypt";

const USERS = {
  async getAllUsers(req, res) {
    // const userDataWithoutPassword = usersData.users.map(
    //   ({ password, ...user }) => user,
    // );
    // res.json(userDataWithoutPassword);
    const users = await User.find();
    if (!users) {
      return res.status(204).json({ message: "No users found" });
    }
    // const userDataWithoutPassword = users.map(({ password, ...user }) => user);
    // res.json(userDataWithoutPassword);
    res.json(users);
  },
  async deleteUser(req, res) {
    if (!req?.body?.id)
      return res.status(404).json({ message: "User ID is required" });
    const user = await User.findOne({ _id: req.body.id }).exec();
    if (!user) {
      return res
        .status(204)
        .json({ message: `User ID ${req.body.id} not found` });
    }
    const result = await user.deleteOne({ _id: req.body.id });
    res.json(result);
  },
};

export default USERS;
