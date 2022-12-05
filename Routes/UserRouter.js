const express = require("express");
const router = express.Router();

const getAllUser = (req, res) => {
  res.status(500).json({
    status: "Error",
    message: "This Function is not implemented yet!😒"
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: "Error",
    message: "This Function is not implemented yet!😒"
  });
};

const getSingleUser = (req, res) => {
  res.status(500).json({
    status: "Error",
    message: "This Function is not implemented yet!😒"
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: "Error",
    message: "This Function is not implemented yet!😒"
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: "Error",
    message: "This Function is not implemented yet!😒"
  });
};

router.route("/").get(getAllUser).post(createUser);
router.route("/:id").get(getSingleUser).patch(updateUser).delete(deleteUser);

module.exports = router;
