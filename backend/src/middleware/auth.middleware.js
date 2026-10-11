import { getAuth } from "@clerk/express";
import User from "../models/user.model.js";

export async function protectRoute(req, res, next) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await User.findOne({ clerkId: userId });

    // Check whether the Clerk user has a MongoDB profile.
    if (!user) {
      return res.status(404).json({
        message: "User profile is not synced yet",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
