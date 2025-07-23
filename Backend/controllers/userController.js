const ErrorHandler = require("../utils/errorhandler")
const catchAsyncError = require("../middleware/catchAsyncError")
const User = require("../models/userModels");
const sendToken = require("../utils/jwtToken");
const sendEmail =  require("../utils/sendEmail") 
const cloudinary = require("cloudinary");
const crypto = require("crypto")
const mongoose = require("mongoose");

// Register our user

exports.registerUser = catchAsyncError(async (req, res, next) => {
    
    const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
   
  });
  
  sendToken(user, 201, res);
});


//Login user
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;


  // Check if email and password are provided
  if (!email || !password) {
      return next(new ErrorHandler("Please enter Email and Password", 400));
  }

  // Find user by email and include password
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
  }

  // Compare password
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
  }

  // Generate token
  sendToken(user,200,res);
});

// Logout User
exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});
// Forgot password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });
//link generation
  const resetPasswordUrl = `http://localhost:4000/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});
exports.resetPassword = catchAsyncError(async (req, res, next)=>{
  //creating token hash
  const resetPasswordToken = crypto.createHash("sha256")
  .update(req.params.token)
  .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {$gt:Date.now()},

  });
  if(!user){
    return next(new ErrorHandler("Reset password token is invalid",400))
  }
  if(req.body.password !== req.body.confirmedPassword){
    return next(new ErrorHandler("Reset password token is invalid",400))
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200,res);
});
//get user datails
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  console.log("Cookies from client:", req.cookies);

  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'User is not authenticated',
    });
  }

  const user = await User.findById(req.user.id).select('-password');
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  res.status(200).json({
    success: true,
    user,
  });
});
//update user details
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  // Validate input
  const { oldPassword, newPassword, confirmPassword } = req.body;
  if (!oldPassword || !newPassword || !confirmPassword) {
    return next(new ErrorHandler("All password fields are required", 400));
  }

  // Find user and include password field
  const user = await User.findById(req.user.id).select("+password");
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Check if old password matches
  const isPasswordMatched = await user.comparePassword(oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 401));
  }

  // Check if new password matches confirm password
  if (newPassword !== confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  // Update password
  user.password = newPassword;
  await user.save();

  // Generate new token and send response
  sendToken(user, 200, res);
});
// update profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData ={
    name:req.body.name,
    email:req.body.email,

  }
  //we will add claudinary later

  const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
    new:true,
    runValidators:true,
    useFindAndModify:false
  });
  
  res.status(200).json({
    success:true,
  });
});
// get all users only admin can do this
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    count: users.length,
    users,
  });
});

// Get single user - Admin only
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  console.log("Request received:", req.method, req.params.id);
  
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    console.log("Invalid ID");
    return next(new ErrorHandler(`Invalid User ID: ${req.params.id}`, 400));
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    console.log("User not found");
    return next(new ErrorHandler(`User does not exist with ID: ${req.params.id}`, 404));
  }

  console.log("User found:", user);

  res.status(200).json({
    success: true,
    user,
  });
});

// Update user role - Admin only
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const { name, email, role } = req.body;

  if (!name || !email || !role) {
    return next(new ErrorHandler('All fields (name, email, role) are required', 400));
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ErrorHandler(`Invalid User ID: ${req.params.id}`, 400));
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name, email, role },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  if (!user) {
    return next(new ErrorHandler(`User not found with ID: ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    message: 'User role updated successfully',
    user,
  });
});

// Delete user - Admin only
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {//This checks whether the id in the request is a valid MongoDB ObjectId.
    return next(new ErrorHandler(`Invalid User ID: ${req.params.id}`, 400));
  }

  const user = await User.findById(req.params.id);//The id parameter is extracted from the URL using req.params. For example, if the route is /user/:id and the URL is /user/123, req.params.id will be "123".

  if (!user) {
    return next(new ErrorHandler(`User does not exist with ID: ${req.params.id}`, 404));
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: 'User deleted successfully',
  });
});
