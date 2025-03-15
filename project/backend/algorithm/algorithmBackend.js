import mongoose from "mongoose";
import { Unit } from "../schemas/unitSchema.js";

function isClassDisallowed(disallowedTimes, cl, duration) {
  for (let t of disallowedTimes) {
    if (t[0] != cl.day) continue; // not on the same day
    if (t[1] < cl.time) continue; // time before class starts

    // time after class starts + before class ends
    if (t[1] < cl.time + duration * 100) {
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
    { "offerings.$": 1 },
  );
  const offering = unit.offerings[0];

  console.log(offering.classTypes);
}

// testing

import dotenv from "dotenv";
import connectDB from "../database/db.js";
dotenv.config();
connectDB();

getOfferingsFiltered({}, "FIT3171", 2025, 1);
