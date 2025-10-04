import uploadImage from "../config/cloudinary.js";
import { createToken } from "../config/token.js";
import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import validator from "validator";
export const signUp=async(req,res)=>{
  try {
    const {userName,email,password}=req.body;
      if(!userName || !email || !password){
    return res.status(400).json({message:"All fields are required"});
  }
  // Handle file upload if a file is provided
 let photoUrl
  if(req.file){
    photoUrl=await uploadImage(req.file.path);
  }
  // Check if user already exists
    const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
// Validate email and password
  if(!validator.isEmail(email)){
    return res.status(400).json({message:"Invalid email format"});
  }
  if(password.length<8){
    return res.status(400).json({message:"Password must be at least 8 characters long"});
  }
  const hashedPassword=await bcrypt.hash(password,10);
  const user=await User.create({
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
    console.log(error);
    
    return res.status(500).json({message:`Sign up failed ${error.message}`});
  }
}
export const signIn=async (req,res) => {
 try {
   const {email,password}=req.body;
   if(!email || !password){
     return res.status(400).json({message:"All fields are required"});
   }
   
   const user=await User.findOne({email});
   if(!user){
     return res.status(400).json({message:"User not found"});
   }
   const isMatch=await bcrypt.compare(password,user.password);
   if(!isMatch){
     return res.status(400).json({message:"Invalid credentials"});
   }
   const token = createToken(user._id);
   res.cookie("token",token,{httpOnly:true,
     secure:false,
     sameSite:"Strict",
     maxAge:7*24*60*60*1000
   });
   return res.status(200).json(user);
 } catch (error) {
    return res.status(500).json({message:`Sign in failed ${error.message}`});
  
 }
}
export const signOut=async (req,res) => {
try {
  await res.clearCookie("token")
  return res.status(200).json({message:"Signout Successfully"})
} catch (error) {
      return res.status(500).json({message:`Sign out failed ${error.message}`});
  
}
}