const express = require("express");
const router = express.Router();
const ContentController = require("../Controller/ContentController");

router.param("id", ContentController.quickcheck);
router
  .route("/")
  .get(ContentController.getallContent)
  .post(ContentController.createContent);
router
  .route("/:id")
  .get(ContentController.quickcheck, ContentController.getSingleContent)
  .patch(ContentController.updateContent)
  .delete(ContentController.deleteContent);

module.exports = router;
