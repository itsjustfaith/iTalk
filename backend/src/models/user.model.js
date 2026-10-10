import mongoose from "mongoose";

//what each user should have
const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: " ",
    },
  },
  { timestampes: true }, //createdAt, updatedAt,
);

const User = mongoose.model("User", userSchema);
export default User;
