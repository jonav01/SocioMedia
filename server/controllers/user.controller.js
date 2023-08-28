import User from "../models/User.js";

export async function addRemoveFriend(req, res) {
  const { userId, friendId } = req.params;
  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);
    if (user.friends.includes(friendId)) {
      // remove friend if it exists
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== userId);
    } else {
      // add friend if doesnt exist
      user.friends.push(friendId);
      friend.friends.push(userId);
    }
    await user.save();
    await friend.save();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
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
export async function getUserAllFriends(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    const friends = await Promise.all(
      user.friends.map((friendsID) => User.findById(friendsID))
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        _id, firstName, lastName, occupation, location, picturePath;
      }
    );
    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json(error);
  }
  return;
}
