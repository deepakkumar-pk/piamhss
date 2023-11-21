// all Student
export const getStudents = async () => {
  const response = await fetch(`api/students`);
  const json = await response.json();

  return json;
};

// single Student
export const getStudent = async (studentId) => {
  const response = await fetch(`api/students/${studentId}`);
  const json = await response.json();

  if (json) return json;
  return {};
};

// posting a new Student
export async function addStudent(formData) {
  try {
    const Options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    const response = await fetch(`api/students`, Options);
    const json = await response.json();

    return json;
  } catch (error) {
    return error;
  }
}

// Update a new Student
export async function updateStudent(studentId, formData) {
  const Options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };

  const response = await fetch(`api/students/${studentId}`, Options);
  const json = await response.json();
  return json;
}

// Delete a new Student
export async function deleteStudent(studentId) {
  const Options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(`api/students/${studentId}`, Options);
  const json = await response.json();
  return json;
}
