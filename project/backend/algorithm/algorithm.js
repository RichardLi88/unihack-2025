/** Returns true if classes c1 and c2 clash */
function hasConflict(c1, c2) {
  return (
    c1.day == c2.day &&
    ((c2.start <= c1.start && c1.start < c2.end) ||
      (c1.start <= c2.start && c2.start < c1.end))
  );
}

/** Returns true if can allocate `selected` given `allocated` */
function isValidAllocation(allocated, selected) {
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
function backtrack(allocations, classOfferings) {
  // valid schedule found
  if (Object.keys(allocations).length == classOfferings.length) {
    return allocations;
  }

  // get the most constrained variable (offering with fewest valid choices)
  let nextOffering = classOfferings
    .filter((o) => !allocations[o.id])
    .sort((a, b) => a.classes.length - b.classes.length)[0];

  for (let c of nextOffering.classes) {
    if (isValidAllocation(allocations, c)) {
      allocations[nextOffering.id] = c; // choose this class
      let result = backtrack(allocations, classOfferings);
      if (result) return result; // return if valid allocation
      delete allocations[nextOffering.id]; // backtrack if failed
    }
  }

  // no valid allocation exists
  return null;
}

function generateTimetable(offerings) {
  let classOfferings = [];
  for (let o of offerings) {
    for (let ct of o.classTypes) {
      for (let c of ct.classes) {
        c.end = c.start + ct.duration * 100;
      }
      ct.id = o.unitcode + ":" + ct.name; // e.g. FIT3159:workshop
      classOfferings.push(ct);
    }
  }

  return backtrack({}, classOfferings);
}

// ========================================
//                EXAMPLE!!!
// ========================================

// let offerings = [
//   {
//     unitcode: "FIT3159",
//     classTypes: [
//       {
//         name: "workshop",
//         duration: 1,
//         classes: [
//           { id: 1, day: "mon", start: 900 },
//           { id: 2, day: "mon", start: 1100 },
//         ],
//       },
//       {
//         name: "applied",
//         duration: 1,
//         classes: [
//           { id: 3, day: "mon", start: 900 },
//           { id: 4, day: "mon", start: 1000 },
//         ],
//       },
//     ],
//   },
//   {
//     unitcode: "FIT3077",
//     classTypes: [
//       {
//         name: "workshop",
//         duration: 1,
//         classes: [
//           { id: 1, day: "mon", start: 900 },
//           { id: 2, day: "mon", start: 1100 },
//         ],
//       },
//       {
//         name: "applied",
//         duration: 1,
//         classes: [
//           { id: 3, day: "tue", start: 900 },
//           { id: 4, day: "tue", start: 1000 },
//         ],
//       },
//     ],
//   },
// ];
//
// let solution = generateTimetable(offerings);
// console.log(solution);
