export const getTimetable = async (req, res) => {
  try {
    const studentId = req.header("student-id");

    if (!studentId) {
      return res
        .status(400)
        .json({ success: false, data: "Student ID is required in headers" });
    }

    // Find timetable for the given studentId
    const student = await studentSchema.findOne({ stuid: studentId });
    const timetable = student.semesterEnrolment;
    if (!timetable) {
      return res
        .status(404)
        .json({ success: false, data: "Timetable not found" });
    }

    return res.status(200).json({ success: true, data: timetable });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, error: "Server error", data: err.message });
  }
};
