import StudentData from "../models/students";

// Get all students
export async function getStudents(req, res) {
  try {
    const students = await StudentData.find({});

    if (students.length === 0) {
      return res.status(404).json({ error: "Data not found" });
    }

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Error while fetching data" });
  }
}

// Get a single student by ID
export async function getStudent(req, res) {
  try {
    const { studentId } = req.query;

    if (studentId) {
      const student = await StudentData.findById(studentId);

      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }

      res.status(200).json(student);
    } else {
      res.status(400).json({ error: "No student ID provided" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error while getting the student" });
  }
}

// Create a new student
export async function postStudent(req, res) {
  try {
    const formData = req.body;

    if (!formData) {
      return res.status(400).json({ error: "Form data not provided" });
    }

    const student = await StudentData.create(formData);
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: "Error while creating the student" });
  }
}

// Update a student by ID
export async function putStudent(req, res) {
  try {
    const { studentId } = req.query;
    const formData = req.body;

    if (studentId && formData) {
      const student = await StudentData.findByIdAndUpdate(studentId, formData, {
        new: true,
      });

      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }

      res.status(200).json(student);
    } else {
      res.status(400).json({ error: "Invalid student ID or form data" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error while updating the student" });
  }
}

// Delete a student by ID
export async function deleteStudent(req, res) {
  try {
    const { studentId } = req.query;

    if (studentId) {
      const student = await StudentData.findByIdAndDelete(studentId);

      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }

      res.status(200).json(student);
    } else {
      res.status(400).json({ error: "No student ID provided" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error while deleting the student" });
  }
}
