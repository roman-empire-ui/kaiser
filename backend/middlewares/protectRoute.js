import jwt from 'jsonwebtoken' 
import User from '../models/userModel.js'




const protectRoute = async(req, res , next) => {
    try {
        const token  = req.cookies.jwt
        

        if(!token) {
            return res.status(401).json({error : 'Unauthorized - no token provided'})
        }
        const decoded = jwt.verify(token , process.env.SECRET_KEY) 

        if(!decoded) {
            return res.status(401).json({error : 'Unauthorized - Invalid token'})
        }

        const user = await User.findById(decoded.userId).select('-password')

        if(!user) {
            return res.status(401).json({error : 'User not found'})

        }
        req.user = user

        next()
    } catch (e) {
        console.log( 'error in protect route' , e)
        res.status(500).json({error : 'Internal server error'})
    }
}

export default protectRoute