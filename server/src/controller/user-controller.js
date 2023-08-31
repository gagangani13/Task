const User = require("../model/user-model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!name || !email || !password) {
      res.send({ message: "Missing or invalid input", ok: false });
    }

    const hashPassword = await bcryptjs.hash(password, 10);
    const register = new User({
      name,
      email,
      password: hashPassword,
    });
    await register.save();
    try {
      res.send({ message: "User registered successfully", ok: true });
    } catch (error) {
      throw new Error(error);
    }
  } catch (error) {
    res.send({ error: error.message, ok: false });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const getUser = await User.findOne({ email });

    if (!getUser) {
      res.send({ message: "Invalid email", ok: false });
    }

    const comparePassword = await bcryptjs.compare(
      password,
      getUser.password
    );

    if (!comparePassword) {
      res.send({ message: "Wrong Password", ok: false });
    }

    const token = await jwt.sign(getUser.id, process.env.JWT_SECRET);

    res.send({ message: "User logged in successfully.", token, ok: true });
  } catch (error) {
    res.send({ error: error.message, ok: false });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
