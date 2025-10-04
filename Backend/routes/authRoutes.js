import express from 'express'
import upload from '../middleware/multer.js';
import { signIn, signOut, signUp } from '../controllers/authControllers.js';


const authRoute=express.Router();

authRoute.post('/signup',upload.single('photoUrl'),signUp)
authRoute.post('/signin',signIn)
authRoute.get('/signout',signOut)

export default authRoute