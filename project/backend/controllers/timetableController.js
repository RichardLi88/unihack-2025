export const getTimetable = async (req, res) => {
  try {
    return res.status(201).json({ success: true, data: "Hello" });
    const { studentId, year, semester } = req.params;
    if (!studentId) {
      return res
        .status(400)
        .json({ success: false, data: "Student ID is required in params" });
    }

    const yearNum = parseInt(year, 10);
    const semesterNum = parseInt(semester, 10);

    // Find timetable for the given studentId
    const student = await studentSchema.findOne({ stuid: studentId });

    if (!student) {
      return res
        .status(404)
        .json({ success: false, data: "Student not found" });
    }

    const units = student.semesterEnrolment.filter(
      (sem) => sem.semester === semesterNum && sem.year === yearNum,
    );

    return res.status(200).json({ success: true, data: units });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, error: "Server error", data: err.message });
  }
};
