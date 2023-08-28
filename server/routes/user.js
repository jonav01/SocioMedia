import express from "express";
import {
  getUser,
  getUserAllFriends,
  addRemoveFriend,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/:id", getUser);
router.get("/:id/friends", getUserAllFriends);

router.patch("/:userId/:friendId", addRemoveFriend);

export default router;
