const taskModal = require("../models/Task");
const { validationResult } = require("express-validator");

exports.getTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10, title, status } = req.query;
    const skip = (page - 1) * limit;
    let query = {};

    if (status) {
      query = { status: status };
    }

    const tasks = await taskModal
      .find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const totalTasks = await taskModal.countDocuments(query);

    res.status(200).json({
      tasks,
      totalTasks,
      totalPages: Math.ceil(totalTasks / limit),
      currentPage: page,
      perPage: limit,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const parsedDueDate = new Date(req.body.dueDate);
    req.body.dueDate = parsedDueDate;

    const task = new taskModal(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.body._id;
    delete req.body.id;

    const task = await taskModal.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const id = req.body.id;
    const task = await taskModal.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
