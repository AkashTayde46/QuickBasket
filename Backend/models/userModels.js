const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
 
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id.toString()  }, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });
};


// Compare Password





// userSchema.methods.comparePassword = async function (password) {
//   console.log("Entered Password:", password, typeof password);
//   console.log("Stored Hashed Password:", this.password, typeof this.password);

//   if (typeof password !== "string" || typeof this.password !== "string") {
//       throw new Error("Invalid password or stored hash format");
//   }

//   return await bcrypt.compare(password, this.password);
// };
userSchema.methods.comparePassword = async function (password) {
  console.log("🔍 Entered Password:", password, typeof password);
  console.log("🔍 Stored Hashed Password:", this.password, typeof this.password);

  try {
    const result = await bcrypt.compare(password, this.password);
    console.log("🔐 bcrypt.compare result:", result);
    return result;
  } catch (err) {
    console.error("❌ bcrypt.compare error:", err.message);
    throw new Error("Invalid password or stored hash format");
  }
};


// Generating Password Reset Token generates a link whic is send to user when he forget password
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);