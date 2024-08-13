import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"], //enum stands for enumerator
      default: "pending",
    },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true } //Adds createdAt and updatedAt timestamps
);

const taskModel = mongoose.model("TaskModel", taskSchema);

export default taskModel;
