const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  const isProd = process.env.NODE_ENV === "production";

  const options = {
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "None" : "Lax",
    domain: isProd ? undefined : undefined, // Let browser set domain
    path: "/",
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
