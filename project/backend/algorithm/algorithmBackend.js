import mongoose from "mongoose";
import { Unit } from "../schemas/unitSchema.js";

/** Returns true if the class c is not allowed given the student's preferences */
function isClassDisallowed(disallowedDayHours, c, duration) {
  for (let t of disallowedDayHours) {
    if (t[0] != c.day) continue; // not on the same day
    if (t[1] < c.time) continue; // time before class starts

    // time after class starts + before class ends
    if (t[1] < c.time + duration * 100) {
      return true;
    }
  }
  return false;
}

/**
 * disallowedTimes: map containing key = "DAY-hr", where
 *   - DAY = "MON", "TUE", "WED", ...
 *   - hr = 8,9,10,...,21
 */
async function getOfferingsFiltered(disallowedTimes, unitcode, year, semester) {
  let dayHours = Object.keys(disallowedTimes);
  // disallowedDayHours = [["MON",800], ["MON",900]]
  let disallowedDayHours = dayHours
    .filter((k) => disallowedTimes[k]) // if dayHours[k] is true, NOT allowed to have class then
    .map((str) => {
      let [d, t] = str.split("-");
      t = parseInt(t) * 100;
      return [d, t];
    });

  const unit = await Unit.findOne(
    {
      code: unitcode,
      "offerings.year": year,
      "offerings.semester": semester,
      // "offerings.classTypes."
    },
    { "offerings.classTypes": 1 }, // only return class types
  );
  const offering = unit.offerings[0];
  offering["code"] = unitcode;
  for (let ct of offering.classTypes) {
    let lenInitial = ct.classes.length;
    ct.classes = ct.classes.filter(
      (c) => !isClassDisallowed(disallowedDayHours, c, ct.duration),
    );

    console.log(
      `Initial class count: ${lenInitial} | Classes left: ${ct.classes.length}`,
    );
  }

  console.log(offering);
  return offering;
}

// testing

import dotenv from "dotenv";
import connectDB from "../database/db.js";
dotenv.config();
connectDB();

getOfferingsFiltered(
  // should filter out 2 workshops
  { "TUE-15": true, "WED-16": true, "WED-18": true },
  "FIT3171",
  2025,
  1,
);
