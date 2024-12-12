const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const {
  createTaskValidator,
  updateTaskValidator,
  deleteTaskValidator,
} = require("../validator/validator");

router.get("/", taskController.getTasks);
router.post("/createTask", createTaskValidator, taskController.createTask);
router.put("/updateTask", updateTaskValidator, taskController.updateTask);
router.delete("/deleteTask", deleteTaskValidator, taskController.deleteTask);

module.exports = router;
