import express from "express";
import { getTimetable } from "../controllers/timetableController.js";

const timetableRouter = express.Router();

timetableRouter.get("/:studentId/:year/:semester", getTimetable);
timetableRouter.get("/period");
timetableRouter.put("/update");

export default timetableRouter;
