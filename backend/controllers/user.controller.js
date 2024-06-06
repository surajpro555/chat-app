import User from "../models/user.Model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const logInUserId=req.user._id;
    const users = await User.find({ _id: { $ne: logInUserId } });

    res.status(200).json(users);
  } catch (error) {
    console.log('Error in getUsersForSidebar', error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};