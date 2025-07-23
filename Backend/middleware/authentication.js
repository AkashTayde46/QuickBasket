const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken")
const User = require("../models/userModels")
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

// const { JWT_SECRET } = require("../config/config");
//to allow functionality to login user 
exports.isAuthenticatedUser = catchAsyncError(async(req, res, next)=>{//isAuthenticatedUser ensures the user is logged in.
const {token} = req.cookies;

console.log(token);
if(!token){
    return next(new ErrorHandler("Please login this to access this resource", 401))
}


const decodeData = jwt.verify(token, JWT_SECRET);//It verifies the token using jwt.verify and the secret key JWT_SECRET.
req.user = await User.findById(decodeData.id);//After verifying the token, it decodes the user ID (decodeData.id) stored in the token payload.
//It uses the decoded user ID to find the corresponding user in the database (User.findById) and assigns it to req.user.
console.log("Decoded user:", req.user);
next()
}
);
//
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403)
            );
        }
        next(); // Call next() only when the user's role is authorized
    };
};
