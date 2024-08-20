import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    dueDate: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
  },
  { timestamps: true }
);

// Create a compound index to ensure unique title per user
taskSchema.index({ title: 1, user: 1 }, { unique: true });

const taskModel = mongoose.model("TaskModel", taskSchema);

export default taskModel;
