import bcrypt from "bcryptjs";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(401)
        .json({ status: true, message: "Email already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      userName,
      email,
      password: hashedPassword,
    });
    return res
      .status(201)
      .json({ status: true, message: "Registration Successfull" });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log("this is user", user);
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!user || !comparePassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN, 
      { expiresIn: "15h" }
    );

    res.cookie("tokenData", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    return res.status(200).json({
      message: "User Login Successfully",
      Data: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role,
        token: token,
      },
    });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};

export { registerUser, loginUser };
