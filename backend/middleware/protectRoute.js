import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const protectRoute= async (req, res, next) => {
    try {
        const token = req.cookies.jwt || req.headers.authorization.split(" ")[1];

        if(!token){
            res.status(401).json({error: "Unauthorized, Please login"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            res.status(401).json({error: "Unauthorized, Invalid token"});
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
           res.status(404).json({error: "User not found"}); 
        }
        req.user = user;
        next();
    
    }catch(error){
        console.error("error in protectRoute controller", error.message);
        res.status(500).json({
            success: false,
            message: 'Error in protectRoute',
            error: error.message
        });
        
    }

}