import express from "express"; 
import { userForSideBar } from "../controllers/usersController.js";
import protectRoute from "../middlewares/protectRoute.js";


const app = express.Router() 



app.get('/getUsers' , protectRoute, userForSideBar) 


export default app