import express from   "express"; 
import { logOut, signIn, signUp } from "../controllers/userController.js";

const app = express.Router() 


app.post('/signup' , signUp )
app.post('/signin' ,  signIn)
app.post('/logout' , logOut)


export default app;
