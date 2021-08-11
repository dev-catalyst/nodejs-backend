const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String, enum: ["Active", "Inactive", "Deleted"], default: "Active" },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
});
UserSchema.statics.hashPassword = async function (password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};
UserSchema.statics.comparePassword = async function (password, dbPassword) {
  return bcrypt.compareSync(password, dbPassword);
};
UserSchema.statics.createPayload = async function (user) {
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
  };
  return payload;
};
const User = mongoose.model("User", UserSchema, "User");
module.exports = { User };
