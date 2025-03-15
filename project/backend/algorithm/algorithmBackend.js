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

async function getAllClassesForUnit(unitcode, year, semester) {
  const unit = await Unit.findOne(
    {
      code: unitcode,
      "offerings.year": year,
      "offerings.semester": semester,
    },
    { "offerings.classTypes": 1 }, // only return class types
  );
  const offering = unit.offerings[0];
  offering["code"] = unitcode;
  return offering;
}

/**
 * disallowedTimes: map containing key = "DAY-hr", where
 *   - DAY = "MON", "TUE", "WED", ...
 *   - hr = 8,9,10,...,21
 * unitcodes: array of unitcodes
 */
async function getOfferingsFiltered(
  disallowedTimes,
  unitcodes,
  year,
  semester,
) {
  let dayHours = Object.keys(disallowedTimes);
  // resultant format: [["MON",800], ["MON",900]]
  let disallowedDayHours = dayHours
    .filter((k) => disallowedTimes[k]) // if dayHours[k] is true, NOT allowed to have class then
    .map((str) => {
      let [d, t] = str.split("-");
      t = parseInt(t) * 100;
      return [d, t];
    });

  let offerings = [];
  for (const unitcode of unitcodes) {
    console.log(`Getting offering for unit ${unitcode}`);
    const offering = await getAllClassesForUnit(unitcode, year, semester);
    offering.classTypes.forEach((ct) => {
      ct.classes = ct.classes.filter(
        (c) => !isClassDisallowed(disallowedDayHours, c, ct.duration),
      );
    });

    // console.log(offering);
    offerings.push(offering);
  }

  return offerings;
}

export { getOfferingsFiltered, getAllClassesForUnit };

// testing

import dotenv from "dotenv";
import connectDB from "../database/db.js";
dotenv.config();
connectDB();

await getOfferingsFiltered(
  // should filter out 2 workshops
  { "TUE-15": true, "WED-16": true, "WED-18": true },
  ["FIT3171", "FIT2004"],
  2025,
  1,
);
