const { body, validationResult } = require("express-validator");

const createTaskValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title is required.")
    .isString()
    .withMessage("Title must be a string."),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string."),
  body("status")
    .notEmpty()
    .withMessage("Status is required.")
    .isIn(["pending", "in-progress", "completed"])
    .withMessage("Status must be one of: pending, in-progress, completed."),
  body("dueDate")
    .notEmpty()
    .withMessage("Due Date is required.")
    .isISO8601()
    .withMessage("Due Date must be a valid date in YYYY-MM-DD format."),
];

const updateTaskValidator = [
  body("_id")
    .notEmpty()
    .withMessage("ID is required")
    .isMongoId()
    .withMessage("Invalid ID format"),

  body("title").optional().isString().withMessage("Title must be a string"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("status")
    .optional()
    .isIn(["pending", "completed", "in-progress"])
    .withMessage("Status must be one of: pending, completed, in-progress"),
];

const deleteTaskValidator = [
  body("id")
    .notEmpty()
    .withMessage("ID is required")
    .isMongoId()
    .withMessage("Invalid ID format"),
];

module.exports = {
  createTaskValidator,
  updateTaskValidator,
  deleteTaskValidator,
};
