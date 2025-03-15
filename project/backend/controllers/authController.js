import studentSchema from "../schemas/studentSchema.js";

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = studentSchema.find(
      (u) => u.username === username && u.password === password,
    );

    if (!user)
      return res.status(401).json({ success: false, data: "No user found" });
    else return res.status(200).json({ success: true, data: user });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, error: "error trying to fetch from db" });
  }
};
