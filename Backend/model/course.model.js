import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  videoUrl: { type: String },
}, {
  timestamps: true,
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
