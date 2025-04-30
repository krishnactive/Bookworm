import Course from "../model/course.model.js";


// @desc    Get all courses
// @route   GET /courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching courses", error: err });
  }
};

// @desc    Get a single course by ID
// @route   GET /courses/:id
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: "Error fetching course", error: err });
  }
};

// @desc    Add a new course
// @route   POST /courses
export const createCourse = async (req, res) => {
  const { title, author, price, image } = req.body;

  if (!title || !author || !price || !image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newCourse = new Course({ title, author, price, image });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(500).json({ message: "Error saving course", error: err });
  }
};

// @desc    Delete a course (optional)
// @route   DELETE /courses/:id
export const deleteCourse = async (req, res) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Course not found" });
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting course", error: err });
  }
};
