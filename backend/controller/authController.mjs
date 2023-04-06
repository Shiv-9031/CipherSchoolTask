import userModel from "../models/user.mjs";
import { comparePassword, hashPassword } from "../utils/authHelper.mjs";
import jwt from "jsonwebtoken";

//REGISTRATION
export const registerController = async (req, res, next) => {
  try {
    const { name, email, password, phone, address } = req.body;

    if (!name) {
      return res.send({ error: "name is required" });
    }
    if (!email) {
      return res.send({ error: "email is required" });
    }
    if (!password) {
      return res.send({ error: "password is required" });
    }
    if (!phone) {
      return res.send({ error: "phone is required" });
    }
    if (!address) {
      return res.send({ error: "address is required" });
    }
    //check user
    const existingUser = await userModel.findOne({ email });
    //existing user
    if (existingUser) {
      return res.status(200).json({
        success: true,
        message: "registered user please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();
    res.status(200).json({
      success: true,
      message: "user registered successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "error in registration",
      err,
    });
  }
};

//LOGIN

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).json({
        success: false,
        message: "Invalid password",
      });
    }
    //token
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "1d",
    });
    res.status(200).json({
      success: true,
      message: "login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in login",
      error,
    });
  }
};
//test
export const testController = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "protected routes",
  });
};
