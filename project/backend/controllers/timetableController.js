import { Student } from "../schemas/studentSchema.js";
import {
  getOffering,
  getOfferingsFiltered,
} from "../algorithm/algorithmBackend.js";
import generateTimetable from "../algorithm/algorithm.js";

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
    const student = await Student.findOne({ stuid: studentId });

    if (!student) {
      return res
        .status(404)
        .json({ success: false, data: "Student not found" });
    }

    const units = student.semesterEnrolment.filter(
      (sem) => sem.semester === semesterNum && sem.year === yearNum,
    )[0];

    return res.status(200).json({ success: true, data: units });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, error: "Server error", data: err.message });
  }
};

export const getAllClassesForEnrolledUnits = async (req, res) => {
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
    const student = await Student.findOne({ stuid: studentId });

    if (!student) {
      return res
        .status(404)
        .json({ success: false, data: "Student not found" });
    }

    const semesterEnrolment = student.semesterEnrolment.filter(
      (sem) => sem.semester === semesterNum && sem.year === yearNum,
    )[0];

    const units = [];
    for (const u of semesterEnrolment.unitEnrolment) {
      const allClasses = await getOffering(u.unitcode, yearNum, semesterNum);
      units.push(allClasses);
    }

    return res.status(200).json({ success: true, data: units });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, error: "Server error", data: err.message });
  }
};

export const getGeneratedTimetable = async (req, res) => {
  try {
    const { studentId, year, semester } = req.params;

    const { disallowedTimes, maxDailyHours } = req.body;

    if (!studentId) {
      return res
        .status(400)
        .json({ success: false, data: "Student ID is required in params" });
    }

    const yearNum = parseInt(year, 10);
    const semesterNum = parseInt(semester, 10);

    // Find timetable for the given studentId
    const student = await Student.findOne({ stuid: studentId });

    if (!student) {
      return res
        .status(404)
        .json({ success: false, data: "Student not found" });
    }

    const enrolment = student.semesterEnrolment.filter(
      (sem) => sem.semester === semesterNum && sem.year === yearNum,
    )[0];

    const units = enrolment.unitEnrolment.map((u) => u.unitcode);

    const offerings = await getOfferingsFiltered(
      disallowedTimes,
      units,
      yearNum,
      semesterNum,
    );

    const soln = generateTimetable(offerings, maxDailyHours);
    return res.status(200).json({ success: true, data: soln });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, error: "Server error", data: err.message });
  }
};
