const express = require("express");
const router = express.Router();
const ContentController = require("../Controller/ContentController");

router
  .route("/")
  .get(ContentController.getallContent)
  .post(ContentController.createContent);
router
  .route("/:id")
  .get(ContentController.getSingleContent)
  .patch(ContentController.updateContent)
  .delete(ContentController.deleteContent);

module.exports = router;
