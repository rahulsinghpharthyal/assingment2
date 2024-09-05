import { Router } from "express";
import {
  createAvailability,
  deleteAvailabilitySlot,
  getAllUsers,
  getAvailabilityByUserAndDate,
  getAvailabilityByUserId,
  updateAvailabilitySlot,
} from "../controllers/availabilityController.js";

const router = Router();

router.route("/create-avilability").post(createAvailability);
router.route("/get-avilability/:id").get(getAvailabilityByUserId);
router.route('/get-avilable').get(getAllUsers);
router.route("/delete-avilability/:id/:slotid").delete(deleteAvailabilitySlot);
router.route("/update-avilability/:id/:slotid").put(updateAvailabilitySlot);
router.route("/getuserdata/:id").get(getAvailabilityByUserAndDate);

export default router;
