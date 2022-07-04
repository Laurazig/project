import mongoose from "mongoose";

const { Schema } = mongoose;

const courseSchema = new Schema({
    courseTitle: { type: String, required: true },
    school: { type: String, required: true },
    courseDate: { type: Number, required: true, min: 1900, max: 2022 } //doesn'T match with my idea!!
});

const Course = mongoose.model("Course", courseSchema);

export default Course;