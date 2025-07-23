// Create Token and saving in cookie

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // options for cookie
  const options = {
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days
    httpOnly: true,
    secure: false, // set to true if using HTTPS
    sameSite: "Lax", // use "None" + secure:true if cross-site and HTTPS
  };

  res.status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      user,
      token,
    });
};

module.exports = sendToken;