const express = require("express");
const router = express.Router();
const fs = require("fs");

const Content = JSON.parse(
  fs.readFileSync(`${__dirname}/../Dev-Data/Content.json`)
);

const getallContent = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAT: req.requesttime,
    results: Content.length,
    data: {
      Content
    }
  });
};

const createContent = (req, res) => {
  console.log(Content.length);
  //   console.log(req.body);
  const newId = Content[Content.length - 1].id + 1;
  const newContent = Object.assign({ id: newId }, req.body);
  Content.push(newContent);
  fs.writeFile(
    `${__dirname}/Dev-Data/Content.json`,
    JSON.stringify(Content),
    err => {
      res.status(201).json({
        status: "success",
        data: {
          Content: newContent
        }
      });
    }
  );
};
const getSingleContent = (req, res) => {
  const id = req.params.id * 1;
  console.log(req.params);
  if (id > Content.length) {
    res.status(404).json({
      status: "failure",
      message: "Invalid Response"
    });
  }
  const Contents = Content.find(el => el.id == id);
  res.status(200).json({
    status: "success",
    data: {
      Contents
    }
  });
};
const updateContent = (req, res) => {
  const id = req.params.id * 1;
  if (id > Content.length) {
    return res.status(404).json({
      status: "failed to load",
      message: "Failed to load the requested ID"
    });
  }
  res.status(200).json({
    status: "Success",
    data: {
      tour: "<updated text will be here>"
    }
  });
};
const deleteContent = (req, res) => {
  const id = req.params.id * 1;
  if (id > Content.length) {
    return res.status(404).json({
      status: "failed to load",
      message: "Failed to load the requested ID"
    });
  }
  res.status(204).json({
    status: "Success",
    data: null
  });
};

router.route("/").get(getallContent).post(createContent);
router
  .route("/:id")
  .get(getSingleContent)
  .patch(updateContent)
  .delete(deleteContent);

module.exports = router;
