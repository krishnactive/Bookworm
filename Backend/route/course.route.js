import express from "express";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  deleteCourse
} from "../controller/course.controller.js";

const router = express.Router();

router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.post("/", createCourse);
router.delete("/:id", deleteCourse); // optional

export default router;
