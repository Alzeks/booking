import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,getHotelRooms
} from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//CREATE
router.post("/:hotelid", createRoom);

//UPDATE
router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", verifyAdmin, updateRoom);
//DELETE
router.delete("/:id/:hotelid", deleteRoom);
router.delete("/:id", deleteRoom);
//router.delete("/:id", deleteRoom);//mmy

//GET
router.get("/:id", getRoom);
//GET ALL
router.get("/", getRooms);

router.get("/hotel/:id", getHotelRooms);//mys

export default router;
