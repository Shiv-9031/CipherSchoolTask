import jwt from "jsonwebtoken";
import userModel from "../models/user.mjs";
//Protected Routes token base

export const requireSignIn = async (req, res, next) => {
  try {
    const decode = jwt.verify(req.headers.authorization, process.env.JWT_TOKEN);

    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
    });
  }
};

//admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role != 1) {
      return res.status(401).json({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
