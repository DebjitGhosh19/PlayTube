import uploadImage from "../config/cloudinary.js";
import { createToken } from "../config/token.js";
import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
export const signUp=async(req,res)=>{
  try {
    const {userName,email,password}=req.body;
      if(!userName || !email || !password){
    return res.status(400).json({message:"All fields are required"});
  }
     let photoUrl;
  if(req.file){
    photoUrl=await uploadImage(req.file.path);
  }
    const existingUser=await User.findOne({email});
  if(existingUser){
    return res.status(400).json({message:"User already exists"});
  }

  if(!validator.isEmail(email)){
    return res.status(400).json({message:"Invalid email format"});
  }
  if(!validator.isStrongPassword(password)){
    return res.status(400).json({message:"Password must be at least 8 characters long and contain a mix of letters, numbers, and symbols"});
  }
  const hashedPassword=await bcrypt.hash(password,10);
  const user=User.create({
    userName,
    email,
    password:hashedPassword,
    photoUrl,  
  });
  const token = createToken(user._id);
  res.cookie("token",token,{httpOnly:true,
    secure:false,
    sameSite:"Strict",
    maxAge:7*24*60*60*1000
  });
  return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({message:"Internal server error"});
  }
}