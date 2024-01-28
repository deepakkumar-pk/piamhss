import StudentData from "../models/students";
import UserData from "../models/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

// Get all users
export async function getUsers(req, res) {
  try {
    const users = await UserData.find({});

    if (users.length === 0) {
      return res.status(404).json({ error: "Data not found" });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error while fetching data" });
  }
}

// Get a single user by ID
export async function getUser(req, res) {
  try {
    const { userId } = req.query;

    if (userId) {
      const user = await UserData.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user);
    } else {
      res.status(400).json({ error: "No user ID provided" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error while getting the user" });
  }
}

// Create a new user
export async function postUser(req, res) {
  try {
    const formData = req.body;

    if (!formData) {
      return res.status(400).json({ error: "Form data not provided" });
    }

    const { name, email, password } = formData;

    const user = new UserData({ name, email, password });
    user.password = bcrypt.hashSync(user.password, 10);
    console.log(user);

    try {
      const createdUser = await user.save();
      res.status(201).json(createdUser);
    } catch (error) {
      res.status(500).json({ error: "Error while creating the user" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error while creating the user" });
  }
}

// Update a user by ID
export async function putUser(req, res) {
  try {
    const { userId } = req.query;
    const formData = req.body;

    if (userId && formData) {
      const user = await UserData.findByIdAndUpdate(userId, formData, {
        new: true,
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user);
    } else {
      res.status(400).json({ error: "Invalid user ID or form data" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error while updating the user" });
  }
}

// Delete a user by ID
export async function deleteUser(req, res) {
  try {
    const { userId } = req.query;

    if (userId) {
      const user = await UserData.findByIdAndDelete(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user);
    } else {
      res.status(400).json({ error: "No user ID provided" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error while deleting the user" });
  }
}

export async function Login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await UserData.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const passMatched = await bcrypt.compare(
      password.toString(),
      user.password
    );

    if (!passMatched) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { _id: user._id, name: user.name },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    const response = res.json(
      {
        message: "Login successful",
        success: true,
        user: user,
      },
      {
        status: 200,
      }
    );
    response.cookies.set("auth_token", token, {
      expiresIn: "1d",
      httpOnly: true,
    });

    return response;

  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
}

