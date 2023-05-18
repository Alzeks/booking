import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {//console.log('regster'); 
  const isUser = await User.findOne({username: req.body.username });
    if(isUser)return next(createError(404, "User exist"));

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      username: req.body.username,
      password: hash,
      isAdmin: req.body.isAdmin,
    });
    const saveUser = await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT, {expiresIn: '30d'}
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res.cookie('refreshToken1', token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
  
  return res.status(200).json({ details: { ...otherDetails }, isAdmin });

  } catch (err) {
    next(err);
  }
};
