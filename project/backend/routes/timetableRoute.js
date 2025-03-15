import express from "express";

const timetableRouter = express.Router();

timetableRouter.get("/:studentId/:year/:semester");
timetableRouter.get("/period");
timetableRouter.put("/update");

export default timetableRouter;
