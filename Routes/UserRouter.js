const express = require("express");
const router = express.Router();
const UserController = require("../Controller/UserController");
router
  .route("/")
  .get(UserController.getAllUser)
  .post(UserController.createUser);
router
  .route("/:id")
  .get(UserController.getSingleUser)
  .patch(UserController.updateUser)
  .delete(UserController.deleteUser);

module.exports = router;
