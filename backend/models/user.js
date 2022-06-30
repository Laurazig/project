import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    emailAddress: { type: String, required: true },
    courses: [
        { courseTitle: { type: String, required: true },
        school: { type: String, required: true },
        courseDate: { type: Number, required: true } }
    ]
})
const User = mongoose.model("User", userSchema);
export default User

