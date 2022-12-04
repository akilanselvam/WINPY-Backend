const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

const port = 3000;
app.listen(port, () => {
  console.log(`your app is running under ${port}🍷🍷🍷.....!!`);
});
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Your server request is working fine",
    status: "success"
  });
});

const Content = JSON.parse(
  fs.readFileSync(`${__dirname}/Dev-Data/Content.json`)
);
app.get("/api/v1/content", (req, res) => {
  res.status(200).json({
    status: "success",
    results: Content.length,
    data: {
      Content
    }
  });
});

app.post("/api/v1/content", (req, res) => {
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
});

app.get("/api/v1/content/:id", (req, res) => {
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
});

app.patch("/api/v1/content/:id", (req, res) => {
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
});

app.delete("/api/v1/content/:id", (req, res) => {
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
});
