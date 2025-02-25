import mongoose from "mongoose"; // Note the change here

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Task title is required"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Task", TaskSchema); // And here
