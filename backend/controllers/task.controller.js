import Task from "../models/task.model.js";

export const createTask = async (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const task = new Task({
      user: req.user._id,
      title,
      description,
    });

    await task.save();

    const io = req.app.get("socketio");
    io.emit("taskCreated", task);

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed creating a task!" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed fetching tasks!" });
  }
};

export const updateTask = async (req, res) => {
  const { title, description, completed } = req.body;
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.completed = completed !== undefined ? completed : task.completed;

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed updating task!" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Task.deleteOne({ _id: req.params.id });
    res.json({ message: "Task removed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed deleting task!" });
  }
};
