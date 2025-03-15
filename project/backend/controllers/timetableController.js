import { Student } from "../schemas/studentSchema.js";
import { getAllClassesForUnit } from "../algorithm/algorithmBackend.js";

export const getTimetable = async (req, res) => {
  try {
    const { studentId, year, semester } = req.params;
    if (!studentId) {
      return res
        .status(400)
        .json({ success: false, data: "Student ID is required in params" });
    }

    const yearNum = parseInt(year, 10);
    const semesterNum = parseInt(semester, 10);

    // Find timetable for the given studentId
    const student = await Student.findOne(
      {
        stuid: studentId,
        "semesterEnrolment.year": yearNum,
        "semesterEnrolment.semester": semesterNum,
      },
      { semesterEnrolment: 1 },
    );

    if (!student) {
      return res
        .status(404)
        .json({ success: false, data: "Student not found" });
    }

    const semesterEnrolment = student.semesterEnrolment[0];
    const units = semesterEnrolment.unitEnrolment.reduce(
      (r, e) => r.push(e.unitcode),
      [],
    );

    const unitsWithClasses = [];
    for (const unitcode in units) {
      allClasses = await getAllClassesForUnit(unitcode, yearNum, semesterNum);
      unitsWithClasses.push(allClasses);
    }

    return res.status(200).json({ success: true, data: unitsWithClasses });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, error: "Server error", data: err.message });
  }
};
