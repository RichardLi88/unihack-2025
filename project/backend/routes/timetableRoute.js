import express from "express";

const timetableRouter = express.Router();

timetableRouter.get("/");
timetableRouter.get("/period");
timetableRouter.put("/update");

export default timetableRouter;
