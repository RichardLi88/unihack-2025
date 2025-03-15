import express from "express";
import {
  getTimetable,
  getAllClassesForEnrolledUnits,
} from "../controllers/timetableController.js";

const timetableRouter = express.Router();

timetableRouter.get("/:studentId/:year/:semester", getTimetable);
timetableRouter.get("/period");
timetableRouter.put("/update");

timetableRouter.get(
  "/:studentId/:year/:semester/all",
  getAllClassesForEnrolledUnits,
);

export default timetableRouter;
