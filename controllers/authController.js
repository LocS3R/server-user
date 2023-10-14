import User from "../model/User.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

const verifyLogin = async (req, res) => {
  const { username, password } = req.body;

  const foundUser = await User.findOne({ username }).exec();
  if (!foundUser) {
    return res.status(400).json("Unauthorized");
  }
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles);
    console.log(roles);
    // This is place to create JWTs
    const accessToken = jwt.sign(
      {
        UserInfor: { username: foundUser.username, roles },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" },
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" },
    );

    // saving refresh token with current user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken, roles });
  } else {
    res.sendStatus(401);
  }
};

export default verifyLogin;
