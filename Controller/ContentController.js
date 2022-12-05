const fs = require("fs");

const Content = JSON.parse(
  fs.readFileSync(`${__dirname}/../Dev-Data/Content.json`)
);

exports.getallContent = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAT: req.requesttime,
    results: Content.length,
    data: {
      Content
    }
  });
};

exports.createContent = (req, res) => {
  console.log(Content.length);
  //   console.log(req.body);
  const newId = Content[Content.length - 1].id + 1;
  const newContent = Object.assign({ id: newId }, req.body);
  Content.push(newContent);
  fs.writeFile(
    `${__dirname}/../Dev-Data/Content.json`,
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

exports.getSingleContent = (req, res) => {
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

exports.updateContent = (req, res) => {
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

exports.deleteContent = (req, res) => {
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
