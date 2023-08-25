import User from "../models/User.js";

export function addRemoveFriend() {
  return null;
}
export async function getUser(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}
export function getUserAllFriends() {
  return null;
}
