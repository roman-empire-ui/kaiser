import express  from "express"; 
import { getMessages, sendMessage } from "../controllers/messageController.js";
import protectRoute from "../middlewares/protectRoute.js";



const app = express.Router() 

app.get('/:id' , protectRoute , getMessages)
app.post('/send/:id' , protectRoute, sendMessage) 

export default app;