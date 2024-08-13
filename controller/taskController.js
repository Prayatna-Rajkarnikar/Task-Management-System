import taskModel from "../models/taskModel.js";

export const addTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;

    const task = new taskModel({
      title,
      description,
      status,
      dueDate,
    });

    await task.save();
    res.status(200).json({ message: "Task added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add task" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedTask = await taskModel.findByIdAndDelete(id);
    if (!deletedTask)
      return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deletion successful" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.body;
    const { title, description, status, dueDate } = req.body;

    const updatedTask = await taskModel.findByIdAndUpdate(
      id,
      { title, description, status, dueDate },
      { new: true }
    );

    if (!updatedTask)
      return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task is updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update task" });
  }
};

export const getTask = async (req, res) => {
  try {
    const { status } = req.body;
    const task = await taskModel.find(status ? { status } : {});
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: "Task not found", error });
  }
};
