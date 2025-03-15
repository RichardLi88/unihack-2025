/** Returns true if classes c1 and c2 clash */
function hasConflict(c1, c2) {
  return (
    c1.day == c2.day &&
    ((c2.start <= c1.start && c1.start < c2.end) ||
      (c1.start <= c2.start && c2.start < c1.end))
  );
}

/** Returns true if can allocate `selected` given `allocated` */
function isValidAllocation(allocated, selected, maxHoursPerDay) {
  function getClassDuration(c) {
    return (c.end - c.start) / 100;
  }

  // validate total hours < max hours per day
  let total_hrs =
    getClassDuration(selected) +
    Object.values(allocated)
      .filter((c) => c.day == selected.day)
      .reduce((s, e) => s + getClassDuration(e), 0);

  if (total_hrs > maxHoursPerDay) {
    return false;
  }

  for (let assignedClass of Object.values(allocated)) {
    if (hasConflict(assignedClass, selected)) {
      return false;
    }
  }
  return true;
}

/**
 * Returns a list of valid allocations if one exists, else null.
 *
 * Inputs:
 * - allocations (map classTypeId:class): default {}
 * - offerings (array): [{offering, [classes{id, start, end}]}]
 * - offerings (array):
 *   [{
 *     name,
 *     duration,
 *     classes: [ { id, day, start, end } ]
 *   }]
 */
function backtrack(allocations, classOfferings, maxHoursPerDay) {
  // valid schedule found
  if (Object.keys(allocations).length == classOfferings.length) {
    return allocations;
  }

  // get the most constrained variable (offering with fewest valid choices)
  let nextOffering = classOfferings
    .filter((o) => !allocations[o.id])
    .sort((a, b) => a.classes.length - b.classes.length)[0];

  for (let c of nextOffering.classes) {
    if (isValidAllocation(allocations, c, maxHoursPerDay)) {
      allocations[nextOffering.id] = c; // choose this class
      let result = backtrack(allocations, classOfferings, maxHoursPerDay);
      if (result) return result; // return if valid allocation
      delete allocations[nextOffering.id]; // backtrack if failed
    }
  }

  // no valid allocation exists
  return null;
}

function generateTimetable(offerings, maxHoursPerDay) {
  let classOfferings = [];
  for (let o of offerings) {
    for (let ct of o.classTypes) {
      for (let c of ct.classes) {
        c.end = c.start + ct.duration * 100;
      }
      ct.id = o.code + ":" + ct.name; // e.g. FIT3159:workshop
      classOfferings.push(ct);
    }
  }

  return backtrack({}, classOfferings, maxHoursPerDay);
}

// ========================================
//                EXAMPLE!!!
// ========================================

let offerings = [
  {
    code: "FIT3159",
    classTypes: [
      {
        name: "workshop",
        duration: 1,
        classes: [
          { id: 1, day: 0, start: 900 },
          { id: 2, day: 0, start: 1100 },
        ],
      },
      {
        name: "applied",
        duration: 1,
        classes: [
          { id: 3, day: 0, start: 900 },
          { id: 4, day: 0, start: 1000 },
        ],
      },
    ],
  },
  {
    code: "FIT3077",
    classTypes: [
      {
        name: "workshop",
        duration: 1,
        classes: [
          { id: 1, day: 0, start: 900 },
          { id: 2, day: 0, start: 1100 },
        ],
      },
      {
        name: "applied",
        duration: 1,
        classes: [
          { id: 3, day: 1, start: 900 },
          { id: 4, day: 1, start: 1000 },
        ],
      },
    ],
  },
];

let solution = generateTimetable(offerings, 3);
console.log(solution);
