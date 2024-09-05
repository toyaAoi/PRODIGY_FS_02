import Admin from "../models/admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

// Register a new Admin
const register = async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await Admin.create({
    username,
    hashedPassword,
  });
  res.status(201).json(newUser);
};

// Login an Admin
const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await Admin.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.hashedPassword))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user._id, username }, config.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ username, token });
};

export default {
  register,
  login,
};
