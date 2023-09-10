import connectToDatabase from "@/database/db";
import {
  getStudents,
  postStudent,
  putStudent,
  deleteStudent,
} from "../../../lib/controller";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  try {
    await connectToDatabase();

    // type of request
    const { method } = req;

    switch (method) {
      case "GET":
        return getStudents(req, res);
      case "POST":
        return postStudent(req, res);
      case "PUT":
        return putStudent(req, res);
      case "DELETE":
        return deleteStudent(req, res);
      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error in the Connection:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
