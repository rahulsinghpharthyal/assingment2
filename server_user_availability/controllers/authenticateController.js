import User from "../models/user.js";

const authenticate = async (req, res) => {
  try {
    const userId = req.user;
    // console.log('this is userID', userId);
    if (!userId) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }
    const existingUser = await User.findOne({ _id: userId });
    // console.log('this is existingUser', existingUser);
    if (!existingUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    // console.log(existingUser);
    return res.status(200).json({ sucess: true, Data: existingUser });
  } catch (err) {
    console.log("eer", err);
    return res.status(500).json({
      sucess: false,
      message: err.message,
    });
  }
};

export default authenticate;
