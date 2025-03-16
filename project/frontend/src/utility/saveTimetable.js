export const saveTimetable = async (stuid, year, sem, semesterEnrolment) => {
  const body = { timetable: semesterEnrolment };

  try {
    const response = await fetch(
      `http://localhost:3000/api/timetable/${stuid}/${year}/${sem}/save`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );
    if (!response.ok) {
      throw new Error(
        `HTTP error! Status: ${response.status}. Received timetable: ${response.data}`,
      );
    }

    const data = await response.json();
    if (data.success) {
      console.log(data.message);
    }
  } catch (err) {
    console.error("Failed to save timetable: ", err);
  }
};
