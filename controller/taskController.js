import taskModel from "../models/taskModel.js";

export const addTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    const userId = req.user.id;

    if (!title || !dueDate) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    const titleExist = await taskModel.findOne({ title });
    if (titleExist) {
      return res.status(400).json({ error: "The title already exist" });
    }

    // Format the dueDate to "13 Aug 2024"
    const formattedDate = new Date(dueDate).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const task = new taskModel({
      title,
      description,
      status,
      dueDate: formattedDate,
      user: userId,
    });

    await task.save();
    res.status(201).json({ message: "Task added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add task" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.user.id;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    // Find and delete the task with matching title and user ID
    const deletedTask = await taskModel.findOneAndDelete({
      title,
      user: userId,
    });

    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found or you are not authorized to delete this task",
      });
    }

    res.status(200).json({ message: "Task deletion successful" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task", error });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    const userId = req.user.id;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const task = await taskModel.findOne({ title, user: userId });

    if (!task) {
      return res.status(404).json({
        message: "Task not found or you are not authorized to update this task",
      });
    }

    // Update the task
    const updatedTask = await taskModel.findOneAndUpdate(
      { title, user: userId },
      { description, status, dueDate },
      { new: true }
    );

    if (!updatedTask) {
      return res
        .status(404)
        .json({ message: "Task not found or update failed" });
    }

    res.status(200).json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update task", error: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const { status } = req.body;
    const userId = req.user.id;

    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    const tasks = await taskModel.find({ status, user: userId });

    if (tasks.length === 0) {
      return res
        .status(404)
        .json({ message: "No tasks found with this status for the user" });
    }

    res.status(200).json({ tasks });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve tasks", error: error.message });
  }
};
