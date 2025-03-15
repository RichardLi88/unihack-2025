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
 */
function backtrack(allocations, offerings) {
  // valid schedule found
  if (Object.keys(allocations).length == offerings.length) {
    return allocations;
  }

  // get the most constrained variable (offering with fewest valid choices)
  let nextOffering = offerings
    .filter((o) => !allocations[o.id])
    .sort((a, b) => a.classes.length - b.classes.length)[0];

  for (let c of nextOffering.classes) {
    if (isValidAllocation(allocations, c)) {
      allocations[nextOffering.id] = c; // choose this class
      let result = backtrack(allocations, offerings);
      if (result) return result; // return if valid allocation
      delete allocations[nextOffering.id]; // backtrack if failed
    }
  }

  // no valid allocation exists
  return null;
}

// ========================================
//                EXAMPLE!!!
// ========================================
//
// let offerings = [
//   {
//     id: "Math",
//     classes: [
//       { id: "Math-1", day: "mon", start: 9, end: 10 },
//       { id: "Math-2", day: "mon", start: 11, end: 12 },
//     ],
//   },
//   {
//     id: "Physics",
//     classes: [
//       { id: "Physics-1", day: "mon", start: 9, end: 10 },
//       { id: "Physics-2", day: "mon", start: 10, end: 11 },
//     ],
//   },
//   {
//     id: "Chemistry",
//     classes: [
//       { id: "Chem-1", day: "mon", start: 10, end: 11 },
//       { id: "Chem-2", day: "mon", start: 11, end: 12 },
//     ],
//   },
// ];
//
// let solution = backtrack({}, offerings);
// console.log(solution);
