const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModels");

const protectedRoute = expressAsyncHandler(async (req, res, next) => {
   let token;
   
   if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
         try {

            token = req.headers.authorization.split(" ")[1]; //taking the token 
            const decode  = jwt.verify(token , process.env.SECRET_KEY); //decoding the token 

            req.user = await User.findById(decode.id).select("-password"); // searching in database By ID
            next();

            
         } catch (error) {
            res.status(401);
            throw new Error("Not authorized , token failed");
         }
   }

   if(!token){
      res.status(401);
      throw new Error("Not authorized ,no token");
   }

});

module.exports = { protectedRoute };
