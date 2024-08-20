import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(401).json({ error: "Please fill all the fields" });
    }

    if (password.length < 6) {
      return res
        .status(401)
        .json({ error: "Password must be at least 6 characters long" });
    }

    const userNameExist = await userModel.findOne({ userName });
    if (userNameExist) {
      return res.status(401).json({ error: "User Name already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      userName,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({ message: "Registered Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(401).json({ error: "Please fill all the fields" });
    }

    const user = await userModel.findOne({ userName });
    if (!user) {
      return res.status(404).json({ error: "User Name does not exist" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid Password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      path: "/",
    });

    res.status(200).json({ message: "Login Successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    path: "/",
  });

  res.status(200).json({ message: "Logout successful" });
};
