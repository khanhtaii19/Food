import mongoose from "mongoose";

// Schema: định nghĩa cấu trúc user
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },       // tên người dùng
  email: { type: String, required: true, unique: true }, // email (unique: không trùng)
  password: { type: String, required: true },   // mật khẩu (hash)
}, { timestamps: true }); // timestamps: tự tạo createdAt, updatedAt

export default mongoose.model("User", userSchema);
